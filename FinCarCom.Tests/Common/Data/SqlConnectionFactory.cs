using System.Data;
using System.Data.SqlClient;

namespace FinCarCom.Tests.Common.Data
{
  public class SqlConnectionFactory : IDbConnectionFactory
  {
    public IDbConnection CreateConnection(string connString)
    {
      var conn = new SqlConnection(connString);
      conn.Open();
      return conn;
    }
  }
}