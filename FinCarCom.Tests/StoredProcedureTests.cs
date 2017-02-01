using System;
using System.Data;
using Dapper;
using FinCarCom.Tests.Common;
using FinCarCom.Tests.Common.Data;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Ninject;


namespace FinCarCom.Tests
{
  [TestClass]
  public class StoredProcedureTests
  {

    #region Declarations

    private static readonly string StoneAgeDbConnString = AppConfig.Get<string>("ConnectionString:StoneAge");

    #endregion


    [TestInitialize]
    public void TestSetup()
    {
      var kernel = new StandardKernel(new TestNinjectModule());
      ServiceLocator.Init(kernel);
    }



    [TestMethod]
    public void Test_procedure__SA_Media_Finance_Available_Contracts()
    {
      using (var conn = VehicleContentDbConn())
      {
        var contracts = conn.Query("dbo.SA_Media_Finance_Available_Contracts",
          new
          {
            zipcode = "38654",
            source_id = 2370,
            type_form_id = 1,
            type_tier_id = 1,
            type_contract_id = 1,
            income_amt = 2300,
            credit_score = 3,
            ssn = "610-61-0610",
            residence_time = 18,
            job_time = 26,
            age = 26
          },
          commandType: CommandType.StoredProcedure);

        foreach (var contract in contracts)
        {

        }
        
      }
    }



    #region Database Connections

    private static IDbConnection VehicleContentDbConn()
    {
      return ServiceLocator.Get<IDbConnectionFactory>().CreateConnection(StoneAgeDbConnString);
    }

    #endregion
  }
}
