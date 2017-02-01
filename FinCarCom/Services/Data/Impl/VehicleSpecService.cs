using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Runtime.Caching;
using FinCarCom.Common;
using FinCarCom.Services.Common;
using FinCarCom.Services.Domain.Services;
using Dapper;
using FinCarCom.Common.Cacheability;
using FinCarCom.Services.Domain.Models.VehicleSpec;


namespace FinCarCom.Services.Data.Impl
{
  public class VehicleSpecService : IVehicleSpecService, ICacheable
  {

    #region Declarations

    private static readonly string VehicleContentDbConnString = WebConfig.Get<string>("ConnectionString:VehicleContent");
    private static readonly int RefreshIntervalInMins = WebConfig.Get<int>("VehicleSpecService:RefiSourceIds:ReCacheInterval_mins");

    private static readonly MemoryCache Cache = MemoryCache.Default;
    private static readonly object Mutex = new object();
    private static IEnumerable<Make> _makes = new List<Make>();
    private static IDictionary<int, IEnumerable<Model>> _modelsByMakeIDictionary = new Dictionary<int, IEnumerable<Model>>();

    #endregion



    public void Warm()
    {
      CacheAllPvcData();
      Cache.Set("VehicleSpecService", String.Empty, GetCachePolicy());
    }



    #region Private Funcs

    #endregion



    #region Public Funcs


    public IEnumerable<IMake> GetMakes()
    {
      return _makes;
    }

    public IEnumerable<IModel> GetModelsByMakeId(int id)
    {
      return _modelsByMakeIDictionary[id];
    }

    #endregion


    #region Cache Refinance Source Ids

    private static void CacheUpdateHandler(CacheEntryUpdateArguments args)
    {
      CacheAllPvcData();
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

    private static void CacheAllPvcData()
    {
      using (var conn = VehicleContentDbConn())
      {
        // Fetch recordsets to cache
        var recordsets = conn.QueryMultiple("FCCWeb.GetPvcCacheData",
          commandType: CommandType.StoredProcedure);


        // Cache Makes (1st recordset)
        var makes = recordsets.Read<Make>().ToList();
        lock (Mutex)
        {
          _makes = makes;
        }


        // Cache Models by MakeId (2nd recordset)
        var modelsByMakeIDictionary = new Dictionary<int, IEnumerable<Model>>();
        var models = recordsets.Read<Model>().ToList();

        foreach (var make in makes)
        {
          modelsByMakeIDictionary.Add(make.Id, models.FindAll(mo => mo.MakeId == make.Id));
        }

        lock (Mutex)
        {
          _modelsByMakeIDictionary = modelsByMakeIDictionary;
        }
      }
    }

    #endregion

    #region Local Memory Cache

    private static ILocalCache LocalCache => ServiceLocator.Get<ILocalCache>();

    #endregion


    #region Database Connections

    private static IDbConnection VehicleContentDbConn()
    {
      return ServiceLocator.Get<IDbConnectionFactory>().CreateConnection(VehicleContentDbConnString);
    }

    #endregion
  }
}