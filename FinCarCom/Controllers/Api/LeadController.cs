using System;
using System.ComponentModel;
using System.Web;
using System.Web.Http;
using FinCarCom.Services;
using FinCarCom.Services.Domain.Models.Sem;
using FinCarCom.Services.Domain.Models.Stage;
using FinCarCom.Services.Domain.Services;
using AutoMapper;
using FinCarCom.Common.Extensions;
using Newtonsoft.Json;


namespace FinCarCom.Controllers.Api
{
  [RoutePrefix("api")]
  public class LeadController : ApiController
  {

    [Route("finance-lead/{id:int=0}", Name = "UpdateStagedLead"), HttpPost]
    public object UpdateStagedLead([FromBody]string jsonString, int id)
    {
      try
      {
        var leadApiParams = JsonConvert.DeserializeObject<Dto.LeadApiParams>(jsonString);

        if(leadApiParams.Id != id)
          throw new Exception("The Id in the JSON does not match the Id on the URL.");


        var lead = Mapper.Map<Lead>(leadApiParams);
        LeadDataService.SaveAsync(lead);

        return new {isKosher = true};
      }
      catch (Exception ex)
      {
        return new {isKosher = false};
      }
    }


    #region Finance calls

    [Route("finance-lead/check", Name = "DoSemPlacementCheckLead"), HttpPost]
    public object DoSemPlacementCheckLead([FromBody]string jsonString)
    {
      try
      {
        // Deserialize json string to the general DTO LeadApiParams object
        var leadApiParams = JsonConvert.DeserializeObject<Dto.LeadApiParams>(jsonString);


        // Map the DTO LeadApiParams object to the PingRequest object (used for SEM proxy service)
        var pingRequest = CreatePingRequestFromApiParams(leadApiParams);
        // Make async call to SEM proxy service for placement check
        var pingResponseTask = SemProxyService.PlacementCheckAsync(pingRequest);


        // Map the DTO LeadApiParams object to the Lead object (used for SQL inserts and local caching)
        var leadToSave = CreateLeadFromApiParams(leadApiParams);
        // Make an async call to LeadDataService to save the lead to SQL
        var leadSaveTask = LeadDataService.SaveAsync(leadToSave);
        //var lead = LeadDataService.Save(leadToSave);


        // Wait for SEM proxy service async call to finish
        pingResponseTask.Wait();
        // Map the placement check response from the SEM proxy service to the DTO PlacementCheckResponse object
        var pingResponse = pingResponseTask.Result;
        var placementCheckResponse = CreatePlacementCheckResponseFromSemServiceResponse(pingResponse);

        // Wait for Lead service async call to finish
        leadSaveTask.Wait();

        // Add the SQL record id to the placement check response
        var lead = leadSaveTask.Result;
        placementCheckResponse.Id = lead.Id;

        // Set the session id, set a server-side maintained flag, then save the lead asynchronously
        // ...but we will not be waiting this time!
        if (pingResponse.IsSuccess)
        {
          LeadDataService
            .SetSuccessfulPlacementCheck(lead.SetSessionId(placementCheckResponse.SessionId), true)
            .SaveAsync(lead);
        }


        return placementCheckResponse;
      }
      catch (Exception ex)
      {
        return new {isKosher = false};
      }
    }


    [Route("finance-lead/submit", Name = "DoSemSubmitLead"), HttpPost]
    public object DoSemSubmitLead([FromBody] string jsonString)
    {
      try
      {
        // Deserialize json string to the general DTO LeadApiParams object
        var leadApiParams = JsonConvert.DeserializeObject<Dto.LeadApiParams>(jsonString);
        var ipAddress = HttpContext.Current.Request.OriginatingClientIpAddress();


        // Map the DTO LeadApiParams object to the PostRequest object (used for SEM proxy service)
        var postRequest = CreatePostRequestFromApiParams(leadApiParams);
        postRequest.IpAddress = ipAddress;
        // Make async call to SEM proxy service for lead submission
        var postResponseTask = SemProxyService.SubmitLeadAsync(postRequest);


        // Map the DTO LeadApiParams object to the Lead object (used for SQL inserts and local caching)
        var lead = CreateLeadFromApiParams(leadApiParams);
        // Set some server-side maintained flags and save the lead asynchronously
        // ...but we will not be waiting this time!
        LeadDataService
          .SetIpAddress(lead, ipAddress)
          .SaveAsync(lead);
        

        // Wait for SEM proxy service async call to finish
        postResponseTask.Wait();
        // Map the lead submission response from the SEM proxy service to the DTO SubmitLeadResponse object
        var postResponse = postResponseTask.Result;
        var submitLeadResponse = CreateSubmitLeadResponseFromSemServiceResponse(postResponse);


        if (postResponse.IsSuccess)
        {
          LeadDataService
            .SetSuccessfulLeadSubmit(lead, true)
            .SaveAsync(lead);
        }


        return submitLeadResponse;
      }
      catch (Exception ex)
      {
        return new {isKosher = false};
      }
    }

    #endregion


    #region Refinance calls

    [Route("refinance-lead/check", Name = "DoAffiliatePlacementCheckLead"), HttpPost]
    public object DoAffiliatePlacementCheckLead([FromBody]string jsonString)
    {
      try
      {
        // Deserialize json string to the general DTO LeadApiParams object
        var leadApiParams = JsonConvert.DeserializeObject<Dto.LeadApiParams>(jsonString);


        // Map the DTO LeadApiParams object to the PingRequest object (used for SEM proxy service)
        var pingRequest = CreatePingRequestFromApiParams(leadApiParams);
        // Make async call to SEM proxy service for placement check
        var pingResponseTask = AffiliateProxyService.PlacementCheckAsync(pingRequest);


        // Map the DTO LeadApiParams object to the Lead object (used for SQL inserts and local caching)
        var leadToSave = CreateLeadFromApiParams(leadApiParams);
        // Make an async call to LeadDataService to save the lead to SQL
        var leadSaveTask = LeadDataService.SaveAsync(leadToSave);
        //var lead = LeadDataService.Save(leadToSave);


        // Wait for SEM proxy service async call to finish
        pingResponseTask.Wait();
        // Map the placement check response from the SEM proxy service to the DTO PlacementCheckResponse object
        var pingResponse = pingResponseTask.Result;
        var placementCheckResponse = CreatePlacementCheckResponseFromSemServiceResponse(pingResponse);

        // Wait for Lead service async call to finish
        leadSaveTask.Wait();

        // Add the SQL record id to the placement check response
        var lead = leadSaveTask.Result;
        placementCheckResponse.Id = lead.Id;

        // Set the session id, set a server-side maintained flag, then save the lead asynchronously
        // ...but we will not be waiting this time!
        if (pingResponse.IsSuccess)
        {
          LeadDataService
            .SetSuccessfulPlacementCheck(lead.SetSessionId(placementCheckResponse.SessionId), true)
            .SaveAsync(lead);
        }


        return placementCheckResponse;
      }
      catch (Exception ex)
      {
        return new { isKosher = false };
      }
    }


    [Route("refinance-lead/submit", Name = "DoAffiliateSubmitLead"), HttpPost]
    public object DoAffiliateSubmitLead([FromBody] string jsonString)
    {
      try
      {
        // Deserialize json string to the general DTO LeadApiParams object
        var leadApiParams = JsonConvert.DeserializeObject<Dto.LeadApiParams>(jsonString);
        var ipAddress = HttpContext.Current.Request.OriginatingClientIpAddress();


        // Map the DTO LeadApiParams object to the PostRequest object (used for SEM proxy service)
        var postRequest = CreatePostRequestFromApiParams(leadApiParams);
        postRequest.IpAddress = ipAddress;
        // Make async call to SEM proxy service for lead submission
        var postResponseTask = AffiliateProxyService.SubmitLeadAsync(postRequest);


        // Map the DTO LeadApiParams object to the Lead object (used for SQL inserts and local caching)
        var lead = CreateLeadFromApiParams(leadApiParams);
        // Set some server-side maintained flags and save the lead asynchronously
        // ...but we will not be waiting this time!
        LeadDataService
          .SetIpAddress(lead, ipAddress)
          .SaveAsync(lead);


        // Wait for SEM proxy service async call to finish
        postResponseTask.Wait();
        // Map the lead submission response from the SEM proxy service to the DTO SubmitLeadResponse object
        var postResponse = postResponseTask.Result;
        var submitLeadResponse = CreateSubmitLeadResponseFromSemServiceResponse(postResponse);


        if (postResponse.IsSuccess)
        {
          LeadDataService
            .SetSuccessfulLeadSubmit(lead, true)
            .SaveAsync(lead);
        }


        return submitLeadResponse;
      }
      catch (Exception ex)
      {
        return new { isKosher = false };
      }
    }

    #endregion


    #region Private Funcs

    private static ILead CreateLeadFromApiParams(Dto.LeadApiParams parms)
    {
      return Mapper.Map<Lead>(parms);
    }

    private static PingRequest CreatePingRequestFromApiParams(Dto.LeadApiParams parms)
    {
      return Mapper.Map<PingRequest>(parms);
    }

    private static PostRequest CreatePostRequestFromApiParams(Dto.LeadApiParams parms)
    {
      return Mapper.Map<PostRequest>(parms);
    }

    private static Dto.PlacementCheckResponse CreatePlacementCheckResponseFromSemServiceResponse(IPingResponse response)
    {
      return Mapper.Map<Dto.PlacementCheckResponse>(response);
    }

    private static Dto.SubmitLeadResponse CreateSubmitLeadResponseFromSemServiceResponse(IPostResponse response)
    {
      return Mapper.Map<Dto.SubmitLeadResponse>(response);
    }

    #endregion


    #region Services

    private static ILeadDataService LeadDataService => ServiceLocator.Get<ILeadDataService>();
    private static IAffiliateProxyService AffiliateProxyService => ServiceLocator.Get<IAffiliateProxyService>();
    private static ISemProxyService SemProxyService => ServiceLocator.Get<ISemProxyService>();
    private static IMapper Mapper => ServiceLocator.Get<IMapper>();
    
    #endregion



    public static class Dto
    {
      internal class LeadApiParams
      {
        [DefaultValue(0)]
        [JsonProperty("id", DefaultValueHandling = DefaultValueHandling.Populate)]
        public int Id { get; set; }

        [DefaultValue("")]
        [JsonProperty("sessionId", DefaultValueHandling = DefaultValueHandling.Populate)]
        public string SessionId { get; set; }

        [DefaultValue("")]
        [JsonProperty("campaignId", DefaultValueHandling = DefaultValueHandling.Populate)]
        public string CampaignId { get; set; }


        [DefaultValue("")]
        [JsonProperty("address", DefaultValueHandling = DefaultValueHandling.Populate)]
        public string Address { get; set; }

        [DefaultValue("")]
        [JsonProperty("city", DefaultValueHandling = DefaultValueHandling.Populate)]
        public string City { get; set; }

        [DefaultValue("")]
        [JsonProperty("state", DefaultValueHandling = DefaultValueHandling.Populate)]
        public string State { get; set; }

        [DefaultValue("")]
        [JsonProperty("zipcode", DefaultValueHandling = DefaultValueHandling.Populate)]
        public string Zipcode { get; set; }


        [DefaultValue("")]
        [JsonProperty("firstName", DefaultValueHandling = DefaultValueHandling.Populate)]
        public string FirstName { get; set; }

        [DefaultValue("")]
        [JsonProperty("lastName", DefaultValueHandling = DefaultValueHandling.Populate)]
        public string LastName { get; set; }

        [DefaultValue("")]
        [JsonProperty("email", DefaultValueHandling = DefaultValueHandling.Populate)]
        public string Email { get; set; }

        [DefaultValue("")]
        [JsonProperty("homePhone", DefaultValueHandling = DefaultValueHandling.Populate)]
        public string HomePhone { get; set; }

        [DefaultValue("")]
        [JsonProperty("mobilePhone", DefaultValueHandling = DefaultValueHandling.Populate)]
        public string MobilePhone { get; set; }

        [DefaultValue(0)]
        [JsonProperty("creditRatingId", DefaultValueHandling = DefaultValueHandling.Populate)]
        public int CreditRatingId { get; set; }



        [DefaultValue(0)]
        [JsonProperty("income", DefaultValueHandling = DefaultValueHandling.Populate)]
        public int AnnualIncome { get; set; }

        public int GrossMonthlyIncome => AnnualIncome / 12;

        [DefaultValue("")]
        [JsonProperty("ssn", DefaultValueHandling = DefaultValueHandling.Populate)]
        public string Ssn { get; set; }

        public string SocialSecurity => Ssn.Replace("-", "");

        [DefaultValue("")]
        [JsonProperty("dob", DefaultValueHandling = DefaultValueHandling.Populate)]
        public string DateOfBirth { get; set; }


        [DefaultValue(0)]
        [JsonProperty("resTimeInMos", DefaultValueHandling = DefaultValueHandling.Populate)]
        public int ResidenceTimeInMos { get; set; }

        [DefaultValue(0)]
        [JsonProperty("resTypeId", DefaultValueHandling = DefaultValueHandling.Populate)]
        public string ResidenceTypeId { get; set; }

        [DefaultValue(0)]
        [JsonProperty("resCostInMos", DefaultValueHandling = DefaultValueHandling.Populate)]
        public int ResidenceCostInMos { get; set; }


        [DefaultValue("")]
        [JsonProperty("employer", DefaultValueHandling = DefaultValueHandling.Populate)]
        public string Employer { get; set; }

        [DefaultValue(0)]
        [JsonProperty("emplTimeInMos", DefaultValueHandling = DefaultValueHandling.Populate)]
        public int EmploymentTimeInMos { get; set; }

        [DefaultValue("")]
        [JsonProperty("jobTitle", DefaultValueHandling = DefaultValueHandling.Populate)]
        public string JobTitle { get; set; }

        [DefaultValue("")]
        [JsonProperty("workPhone", DefaultValueHandling = DefaultValueHandling.Populate)]
        public string WorkPhone { get; set; }

        // Vehicle params
        [DefaultValue("")]
        [JsonProperty("make", DefaultValueHandling = DefaultValueHandling.Populate)]
        public string Make { get; set; }

        [DefaultValue("")]
        [JsonProperty("model", DefaultValueHandling = DefaultValueHandling.Populate)]
        public string Model { get; set; }

        [DefaultValue("")]
        [JsonProperty("year", DefaultValueHandling = DefaultValueHandling.Populate)]
        public string Year { get; set; }

        [DefaultValue("")]
        [JsonProperty("mileage", DefaultValueHandling = DefaultValueHandling.Populate)]
        public string Mileage { get; set; }


        // Bool params
        [DefaultValue(false)]
        [JsonProperty("privacyPolicyApproved")]
        public bool PrivacyPolicyIsAccepted { get; set; }

        [DefaultValue(false)]
        [JsonProperty("creditAuthApproved")]
        public bool CreditAuthorizationIsApproved { get; set; }

        [DefaultValue(false)]
        [JsonProperty("forwardAppAuthApproved")]
        public bool ForwardApplicationIsApproved { get; set; }

        [DefaultValue(false)]
        [JsonProperty("creditEvalOfferAccepted")]
        public bool CreditEvalOfferIsAccepted { get; set; }

        [DefaultValue(false)]
        [JsonProperty("tcpaContactAccepted")]
        public bool TcpaAllowUsToContactIsAccepted { get; set; }
      }

      internal class PlacementCheckResponse
      {
        [DefaultValue(0)]
        [JsonProperty("id", DefaultValueHandling = DefaultValueHandling.Populate)]
        public int Id { get; set; }

        [DefaultValue("")]
        [JsonProperty("sessionId", DefaultValueHandling = DefaultValueHandling.Populate)]
        public string SessionId { get; set; }

        [DefaultValue(false)]
        [JsonProperty("isKosher", DefaultValueHandling = DefaultValueHandling.Populate)]
        public bool IsSuccess { get; set; }
      }

      internal class SubmitLeadResponse
      {
        [DefaultValue(0)]
        [JsonProperty("id", DefaultValueHandling = DefaultValueHandling.Populate)]
        public int Id { get; set; }

        [DefaultValue("")]
        [JsonProperty("sessionId", DefaultValueHandling = DefaultValueHandling.Populate)]
        public string SessionId { get; set; }

        [DefaultValue(false)]
        [JsonProperty("isKosher", DefaultValueHandling = DefaultValueHandling.Populate)]
        public bool IsSuccess { get; set; }
      }
    }
  }
}
