using System;
using System.Xml.Serialization;

namespace FinCarCom.Services.Domain.Models.Affiliate
{
  [XmlRoot("placementcheckresponse", Namespace = "http://www.car.com/FinanceWebService/")]
  public class PostResponse : IPostResponse
  {
    [XmlAttribute("contractid")]
    public int ContractId { get; set; }

    [XmlElement("outboundSourceID")]
    public int OutboundSourceId { get; set; }

    [XmlElement("inboundSourceID")]
    public int InboundSourceId { get; set; }

    [XmlElement("pingtype")]
    public string PingType { get; set; }

    [XmlElement("success")]
    public bool IsSuccess { get; set; }

    [XmlElement("responseid")]
    public string ResponseId { get; set; }

    [XmlElement("message")]
    public string Message { get; set; }

    [XmlElement("duration")]
    public double Duration { get; set; }

    [XmlElement("rawrequest")]
    public string RawRequest { get; set; }

    [XmlElement("rawresponse")]
    public string RawResponse { get; set; }

    [XmlElement("rejectedreason")]
    public string RejectedReason { get; set; }

    [XmlElement("pingstarttime")]
    public DateTime PingStartTime { get; set; }

    [XmlElement("scoretype")]
    public string ScoreType { get; set; }

    [XmlElement("minimumincomeamount")]
    public decimal MinimumIncomeAmount { get; set; }

    [XmlElement("maximumincomeamount")]
    public decimal MaximumIncomeAmount { get; set; }
  }
}