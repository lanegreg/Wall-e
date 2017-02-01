using FinCarCom.Services.Domain.Models.Common;

namespace FinCarCom.Services.Domain.Models.Affiliate
{
  public interface IPingRequest : IQuerystringable
  {
    string Username { get; }
    string Password { get; }
    string Zipcode { get; }
    int SourceId { get; }
    //bool IsBackend { get; }
    //string FormType { get; }
    string SocialSecurity { get; }
    //string TierType { get; }
    string GrossMonthlyIncome { get; }
    //string CreditRating { get; }
    //string Timeout { get; }
  }
}