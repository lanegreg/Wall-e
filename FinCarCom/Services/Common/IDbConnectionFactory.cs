using System.Data;


namespace FinCarCom.Services.Common
{
  public interface IDbConnectionFactory
  {
    IDbConnection CreateConnection(string connString);
  }
}