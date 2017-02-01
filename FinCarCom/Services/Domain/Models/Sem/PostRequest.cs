using System;
using FinCarCom.Common;
using FinCarCom.Services.Domain.Models.Common;


namespace FinCarCom.Services.Domain.Models.Sem
{
  public class PostRequest : QuerystringBase, IPostRequest
  {
    private static readonly string User = WebConfig.Get<string>("SemService:Username");
    private static readonly string Pass = WebConfig.Get<string>("SemService:Password");
    private static readonly int SrcId = WebConfig.Get<int>("SemService:SourceId");



    [QuerystringProperty("codeA")]
    public string Username => User;

    [QuerystringProperty("codeB")]
    public string Password => Pass;

    [QuerystringProperty("sessionID")]
    public string SessionId { get; set; } = String.Empty;

    [QuerystringProperty("sourceID")]
    public int SourceId => SrcId;

    [QuerystringProperty("sourceLeadID")]
    public string CampaignId { get; set; } = String.Empty;

    [QuerystringProperty("ipAddress")]
    public string IpAddress { get; set; } = String.Empty;



    [QuerystringProperty("nameFirst")]
    public string FirstName { get; set; } = String.Empty;

    [QuerystringProperty("nameLast")]
    public string LastName { get; set; } = String.Empty;

    [QuerystringProperty("email")]
    public string Email { get; set; } = String.Empty;

    [QuerystringProperty("phoneHome")]
    public string HomePhone { get; set; } = String.Empty;

    [QuerystringProperty("phoneMobile")]
    public string MobilePhone { get; set; } = String.Empty;

    [IgnoreAttribute]
    public int CreditRatingId { get; set; } = 0;

    [QuerystringProperty("selfCreditRating")]
    public string SelfCreditRating => CreditRatingTranslator.FindById(CreditRatingId).Name;

    [QuerystringProperty("gmi")]
    public int GrossMonthlyIncome { get; set; } = 0;

    [QuerystringProperty("dob")]
    public string DateOfBirth { get; set; } = String.Empty;

    [QuerystringProperty("ssn")]
    public string SocialSecurity { get; set; } = String.Empty;

    [QuerystringProperty("streetAddress")]
    public string Address { get; set; } = String.Empty;

    [QuerystringProperty("zipCode")]
    public string Zipcode { get; set; } = String.Empty;


    [IgnoreAttribute]
    public int ResidenceTypeId { get; set; } = 0;

    [QuerystringProperty("residenceType")]
    public string ResidenceType => ResidenceTypeTranslator.FindById(ResidenceTypeId).Name;

    [QuerystringProperty("monthlyPayment")]
    public int ResidenceCostInMos { get; set; } = 0;

    [IgnoreAttribute]
    public int ResidenceTimeInMos { get; set; } = 0;

    [QuerystringProperty("residenceYears")]
    public int ResidenceYears => ResidenceTimeInMos / 12;

    [QuerystringProperty("residenceMonths")]
    public int ResidenceMonths => ResidenceTimeInMos % 12;



    [QuerystringProperty("employerName")]
    public string Employer { get; set; } = String.Empty;

    [QuerystringProperty("jobTitle")]
    public string JobTitle { get; set; } = String.Empty;

    [QuerystringProperty("phoneWork")]
    public string WorkPhone { get; set; } = String.Empty;

    [IgnoreAttribute]
    public int EmploymentTimeInMos { get; set; } = 0;

    [QuerystringProperty("employmentYears")]
    public int EmploymentYears => EmploymentTimeInMos / 12;

    [QuerystringProperty("employmentMonths")]
    public int EmploymentMonths => EmploymentTimeInMos % 12;



    [QuerystringProperty("privacyAccept")]
    public bool PrivacyPolicyIsAccepted { get; set; }

    [QuerystringProperty("creditAuthorization")]
    public bool CreditAuthorizationIsApproved { get; set; }

    [QuerystringProperty("forwardApplicationAuthorization")]
    public bool ForwardApplicationIsApproved { get; set; }

    [QuerystringProperty("creditEvaluationOffer")]
    public bool CreditEvalOfferIsAccepted { get; set; }

    [QuerystringProperty("tcpaContactAccept")]
    public bool TcpaAllowUsToContactIsAccepted { get; set; }
  }
}