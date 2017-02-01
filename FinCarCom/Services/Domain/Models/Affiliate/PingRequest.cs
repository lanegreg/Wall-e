using System;
using FinCarCom.Common;
using FinCarCom.Services.Domain.Models.Common;

namespace FinCarCom.Services.Domain.Models.Affiliate
{
  public class PingRequest : QuerystringBase, IPingRequest
  {
    private static readonly string User = WebConfig.Get<string>("SemService:Username");
    private static readonly string Pass = WebConfig.Get<string>("SemService:Password");
    private static readonly int SrcId = WebConfig.Get<int>("SemService:SourceId");



    [QuerystringProperty("codeA")]
    public string Username => User;

    [QuerystringProperty("codeB")]
    public string Password => Pass;

    [QuerystringProperty("sourceID")]
    public int SourceId => SrcId;

    [QuerystringProperty("zipCode")]
    public string Zipcode { get; set; } = String.Empty;

    [QuerystringProperty("ssn")]
    public string SocialSecurity { get; set; } = String.Empty;

    [QuerystringProperty("gmi")]
    public string GrossMonthlyIncome { get; set; } = String.Empty;
  }
}