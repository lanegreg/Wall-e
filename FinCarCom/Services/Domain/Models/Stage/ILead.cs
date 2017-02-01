

namespace FinCarCom.Services.Domain.Models.Stage
{
  public interface ILead
  {
    int Id { get; set;  }
    string SessionId { get; }
    string CampaignId { get; }
    string IpAddress { get; }

    string FirstName { get; }
    string LastName { get; }
    string DateOfBirth { get; }
    string SocialSecurity { get; }
    string Email { get; }
    string HomePhone { get; }
    string MobilePhone { get; }

    string Address { get; }
    string City { get; }
    string State { get; }
    string Zipcode { get; }

    int GrossMonthlyIncome { get; }
    int CreditRatingId { get; }
    int ResidenceTimeInMos { get; }
    int ResidenceTypeId { get; }
    int ResidenceCostInMos { get; }

    string Employer { get; }
    int EmploymentTimeInMos { get; }
    string JobTitle { get; }
    string WorkPhone { get; }

    bool PrivacyPolicyIsAccepted { get; }
    bool CreditAuthorizationIsApproved { get; }
    bool ForwardApplicationIsApproved { get; }
    bool CreditEvalOfferIsAccepted { get; }
    bool TcpaAllowUsToContactIsAccepted { get; }

    bool SuccessfulPlacementCheck { get; }
    bool SuccessfulLeadSubmission { get; }


    ILead SetId(int id);
    ILead SetSessionId(string sessionId);
  }
}