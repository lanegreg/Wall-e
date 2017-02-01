using System.Data;

namespace FinCarCom.Tests.Common.Data
{
  public interface IDbConnectionFactory
  {
    IDbConnection CreateConnection(string connString);
  }
}