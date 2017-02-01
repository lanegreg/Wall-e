using System.Collections.Generic;
using System.Data;
using FinCarCom.Common;
using FinCarCom.Services.Common;
using FinCarCom.Services.Domain.Services;
using Dapper;
using FinCarCom.Services.Domain.Models.Geo;


namespace FinCarCom.Services.Data.Impl
{
  public class GeoService : IGeoService
  {
    private static readonly string StoneAgeDbConnString = WebConfig.Get<string>("ConnectionString:StoneAge");


    public IEnumerable<ICityStateZip> GetCityStatesByZip(string zipcode)
    {
      using (var conn = StoneAgeDbConn())
      {
        return conn.Query<CityStateZip>("FCCWeb.GetCityStatesByZip",
          new {Zipcode = zipcode},
          commandType: CommandType.StoredProcedure);
      }
    }


    public bool VerifyZipcode(string zipcode)
    {
      using (var conn = StoneAgeDbConn())
      {
        var arguments = new DynamicParameters(new {Zipcode = zipcode});
        arguments.Add("ReturnVal", dbType: DbType.Boolean, direction: ParameterDirection.Output);

        conn.Execute("FCCWeb.VerifyZipcode", arguments, commandType: CommandType.StoredProcedure);

        return arguments.Get<bool>("ReturnVal");
      }
    }



    #region Connections
    private static IDbConnection StoneAgeDbConn()
    {
      return ServiceLocator.Get<IDbConnectionFactory>().CreateConnection(StoneAgeDbConnString);
    }
    #endregion

  }
}