using FinCarCom.Services.Domain.Models.Common;


namespace FinCarCom.Services.Domain.Models.Sem
{
  public interface IPostRequest : IQuerystringable
  {
    string Username { get; }
    string Password { get; }
    string SessionId { get; }
    int SourceId { get; }
    string CampaignId { get; }
    string IpAddress { get; }
    string FirstName { get; }
    string LastName { get; }
    string Email { get; }
    string HomePhone { get; }
    string MobilePhone { get; }
    int CreditRatingId { get; }
    int GrossMonthlyIncome { get; }
    string DateOfBirth { get; }
    string SocialSecurity { get; }
    string Address { get; }
    string Zipcode { get; }
    int ResidenceTypeId { get; }
    int ResidenceCostInMos { get; }
    int ResidenceTimeInMos { get; }
    int ResidenceYears { get; }
    int ResidenceMonths { get; }
    string Employer { get; }
    string JobTitle { get; }
    string WorkPhone { get; }
    int EmploymentTimeInMos { get; }
    int EmploymentYears { get; }
    int EmploymentMonths { get; }
    bool PrivacyPolicyIsAccepted { get; }
    bool CreditAuthorizationIsApproved { get; }
    bool ForwardApplicationIsApproved { get; }
    bool CreditEvalOfferIsAccepted { get; }
    bool TcpaAllowUsToContactIsAccepted { get; }
  }
}