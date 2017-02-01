using System;
using System.Collections.Generic;
using System.Data;
using System.Runtime.Caching;
using System.Threading.Tasks;
using FinCarCom.Common;
using FinCarCom.Services.Common;
using FinCarCom.Services.Domain.Models.Stage;
using FinCarCom.Services.Domain.Services;
using Dapper;
using FinCarCom.Common.Cacheability;


namespace FinCarCom.Services.Data.Impl
{
  public class LeadDataService : ILeadDataService, ICacheable
  {

    #region Declarations

    private static readonly string StoneAgeDbConnString = WebConfig.Get<string>("ConnectionString:StoneAge");
    private static readonly double LocalCacheLeadSecsToLive = WebConfig.Get<double>("LeadDataService:LocalCacheLead_mins") * 60;
    private const string LeadCacheKeyTempl = "stage_lead:id[{0}]";

    private static readonly int RefreshIntervalInMins = WebConfig.Get<int>("LeadDataService:RefiSourceIds:ReCacheInterval_mins");
    private static readonly MemoryCache Cache = MemoryCache.Default;

    private static readonly object Mutex = new object();
    private static IEnumerable<Source> _refiSources = new List<Source>();

    #endregion



    public void Warm()
    {
      CacheAllRefiSources();
      Cache.Set("LeadDataService", String.Empty, GetCachePolicy());
    }



    #region Private Funcs

    private static void StoreLeadInLocalCache(ILead lead)
    {
      if (lead.Id <= 0)
        return;

      var cacheKey = String.Format(LeadCacheKeyTempl, lead.Id);
      LocalCache.Put(cacheKey, lead, LocalCacheLeadSecsToLive);
    }


    private static ILead RetrieveLeadFromLocalCache(int id)
    {
      var cacheKey = String.Format(LeadCacheKeyTempl, id);
      return LocalCache.Get<ILead>(cacheKey);
    }


    private static ILead RetrieveCurrentLead(int id)
    {
      if (id <= 0)
        return null;

      var lead = RetrieveLeadFromLocalCache(id);
      
      if (lead != null)
        return lead;


      using (var conn = StoneAgeDbConn())
      {
        lead = conn.QueryFirst<ILead>("FCCWeb.GetStagedLeadById",
          new {Id = id},
          commandType: CommandType.StoredProcedure);

        StoreLeadInLocalCache(lead);

        return lead;
      }
    }


    private async Task<int> UpsertLeadAsync(ILead lead)
    {
      using (var conn = StoneAgeDbConn())
      {
        const string returnPropName = "ReturnVal";
        var arguments = new DynamicParameters(lead);

        arguments.Add(returnPropName,
          dbType: DbType.Int32,
          direction: ParameterDirection.Output);

        await conn.ExecuteAsync("FCCWeb.UpsertStagedLead",
          arguments,
          commandType: CommandType.StoredProcedure)
          .ConfigureAwait(false);

        
        return arguments.Get<int>(returnPropName);
      }
    }

    #endregion


    public IEnumerable<Source> RefinanceSources => _refiSources;


    #region Public Funcs

    public async Task<ILead> GetLeadByIdAsync(int id)
    {
      using (var conn = StoneAgeDbConn())
      {
        var leadTask = await conn.QueryFirstAsync<Lead>("FCCWeb.GetStagedLeadById",
          new {Id = id},
          commandType: CommandType.StoredProcedure)
          .ConfigureAwait(false);

        return leadTask;
      }
    }

    public ILead GetLeadById(int id)
    {
      return GetLeadByIdAsync(id).Result;
    }


    public async Task<ILead> SaveAsync(ILead lead)
    {
      var currentLead = RetrieveCurrentLead(lead.Id);

      if (currentLead != null)
      {
        // Sync-up server-side maintained state props
        ((ILeadState) lead)
          .SetSuccessfulPlacementCheck(currentLead.SuccessfulPlacementCheck)
          .SetSuccessfulLeadSubmission((currentLead.SuccessfulLeadSubmission))
          .SetIpAddress(currentLead.IpAddress);
      }

      var id = await UpsertLeadAsync(lead).ConfigureAwait(false);

      // Set the Id on this lead and then store it in local cache
      StoreLeadInLocalCache(lead.SetId(id));

      return lead;
    }

    public ILead Save(ILead lead)
    {
      return SaveAsync(lead).Result;
    }


    public ILeadDataService SetSuccessfulPlacementCheck(ILead lead, bool state)
    {
      ((ILeadState) lead).SetSuccessfulPlacementCheck(state);
      return this;
    }

    public ILeadDataService SetSuccessfulLeadSubmit(ILead lead, bool state)
    {
      ((ILeadState)lead).SetSuccessfulLeadSubmission(state);
      return this;
    }

    public ILeadDataService SetIpAddress(ILead lead, string ipAddress)
    {
      ((ILeadState)lead).SetIpAddress(ipAddress);
      return this;
    }

    #endregion


    #region Cache Refinance Source Ids

    private static void CacheUpdateHandler(CacheEntryUpdateArguments args)
    {
      CacheAllRefiSources();
      var cacheItem = Cache.GetCacheItem(args.Key);

      if (cacheItem != null)
        cacheItem.Value = String.Empty;
      else
        cacheItem = new CacheItem("cacheItem", String.Empty);

      args.UpdatedCacheItem = cacheItem;
      args.UpdatedCacheItemPolicy = GetCachePolicy();
    }

    private static CacheItemPolicy GetCachePolicy()
    {
      return new CacheItemPolicy
      {
        AbsoluteExpiration = DateTimeOffset.Now.AddMinutes(RefreshIntervalInMins),
        UpdateCallback = CacheUpdateHandler
      };
    }

    private static void CacheAllRefiSources()
    {
      var refiSources = GetRefiSourcesAsync().Result;

      lock (Mutex)
      {
        _refiSources = refiSources;
      }
    }

    private static async Task<IEnumerable<Source>> GetRefiSourcesAsync()
    {
      using (var conn = StoneAgeDbConn())
      {
        var sourcesTask = await conn.QueryAsync<Source>("FCCWeb.GetRefiSources",
          commandType: CommandType.StoredProcedure)
          .ConfigureAwait(false);

        return sourcesTask;
      }
    }

    #endregion

    #region Local Memory Cache

    private static ILocalCache LocalCache => ServiceLocator.Get<ILocalCache>();

    #endregion


    #region Database Connections

    private static IDbConnection StoneAgeDbConn()
    {
      return ServiceLocator.Get<IDbConnectionFactory>().CreateConnection(StoneAgeDbConnString);
    }

    #endregion

  }
}