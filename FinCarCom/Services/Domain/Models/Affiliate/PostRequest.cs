using System;
using FinCarCom.Common;
using FinCarCom.Services.Domain.Models.Common;

namespace FinCarCom.Services.Domain.Models.Affiliate
{
  public class PostRequest : QuerystringBase, IPostRequest
  {
    private static readonly string User = WebConfig.Get<string>("SemService:Username");
    private static readonly string Pass = WebConfig.Get<string>("SemService:Password");
    private static readonly string Tout = WebConfig.Get<string>("SemService:Timeout_ms");



    [QuerystringProperty("userName")]
    public string UserName => User;

    [QuerystringProperty("passWord")]
    public string Password => Pass;

    [QuerystringProperty("zipCode")]
    public string Zipcode { get; set; } = String.Empty;

    [QuerystringProperty("sourceID")]
    public int SourceId { get; set; }

    [QuerystringProperty("backend")]
    public bool IsBackend { get; set; }

    [QuerystringProperty("formType")]
    public string FormType { get; set; } = "1";

    [QuerystringProperty("ssn")]
    public string SocialSecurityNumber { get; set; } = String.Empty;

    [QuerystringProperty("tierType")]
    public string TierType { get; set; } = String.Empty;

    [QuerystringProperty("gmi")]
    public string GrossMonthlyIncome { get; set; } = String.Empty;

    [QuerystringProperty("creditScore")]
    public string SelfCreditRating { get; set; } = String.Empty;

    [QuerystringProperty("timeOut")]
    public string Timeout => Tout;
  }
}