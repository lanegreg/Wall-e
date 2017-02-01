using FinCarCom.Services.Domain.Models.Common;

namespace FinCarCom.Services.Domain.Models.Affiliate
{
  public interface IPostRequest : IQuerystringable
  {
    string UserName { get; }
    string Password { get; }
    string Zipcode { get; }
    int SourceId { get; }
    bool IsBackend { get; }
    string FormType { get; }
    string SocialSecurityNumber { get; }
    string TierType { get; }
    string GrossMonthlyIncome { get; }
    string SelfCreditRating { get; }
    string Timeout { get; }
  }
}