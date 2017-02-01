using System;
using FinCarCom.Services.Domain.Models.Common;


namespace FinCarCom.Services.Domain.Models.Stage
{
  public class Lead : Entity, ILead, ILeadState
  {

    public Lead()
    {
      IpAddress = String.Empty;
    }

    public string SessionId { get; set; }
    public string CampaignId { get; set; }

    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string DateOfBirth { get; set; }
    public string SocialSecurity { get; set; }
    public string Email { get; set; }
    public string HomePhone { get; set; }
    public string MobilePhone { get; set; }

    public string Address { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string Zipcode { get; set; }

    public int GrossMonthlyIncome { get; set; }
    public int CreditRatingId { get; set; }
    public int ResidenceTimeInMos { get; set; }
    public int ResidenceTypeId { get; set; }
    public int ResidenceCostInMos { get; set; }

    public string Employer { get; set; }
    public int EmploymentTimeInMos { get; set; }
    public string JobTitle { get; set; }
    public string WorkPhone { get; set; }

    public bool PrivacyPolicyIsAccepted { get; set; }
    public bool CreditAuthorizationIsApproved { get; set; }
    public bool ForwardApplicationIsApproved { get; set; }
    public bool CreditEvalOfferIsAccepted { get; set; }
    public bool TcpaAllowUsToContactIsAccepted { get; set; }


    public bool SuccessfulPlacementCheck { get; private set; }
    public bool SuccessfulLeadSubmission { get; private set; }
    public string IpAddress { get; set; }
    
    public ILeadState SetSuccessfulPlacementCheck(bool state)
    {
      SuccessfulPlacementCheck = state;
      return this;
    }

    public ILeadState SetSuccessfulLeadSubmission(bool state)
    {
      SuccessfulLeadSubmission = state;
      return this;
    }

    public ILeadState SetIpAddress(string ipAddress)
    {
      IpAddress = ipAddress;
      return this;
    }



    public ILead SetId(int id)
    {
      Id = id;
      return this;
    }

    public ILead SetSessionId(string sessionId)
    {
      SessionId = sessionId;
      return this;
    }
  }
}