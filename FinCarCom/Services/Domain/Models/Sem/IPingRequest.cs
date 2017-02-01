using FinCarCom.Services.Domain.Models.Common;


namespace FinCarCom.Services.Domain.Models.Sem
{
  public interface IPingRequest : IQuerystringable
  {
    string Username { get; }
    string Password { get; }
    string Zipcode { get; }
    int SourceId { get; }
    string SocialSecurity { get; }
    int GrossMonthlyIncome { get; }
  }
}