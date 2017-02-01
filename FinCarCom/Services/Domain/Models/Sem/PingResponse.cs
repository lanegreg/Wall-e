using System.Xml.Serialization;


namespace FinCarCom.Services.Domain.Models.Sem
{
  [XmlRoot("pingresponse")]
  public class PingResponse : IPingResponse
  {
    [XmlElement("success")]
    public bool IsSuccess { get; set; }

    [XmlElement("sessionid")]
    public string SessionId { get; set; }

    [XmlElement("duration")]
    public double Duration { get; set; }

    [XmlElement("rejectedreason")]
    public string RejectedReason { get; set; }
  }
}