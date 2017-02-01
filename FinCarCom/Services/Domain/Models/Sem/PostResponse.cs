using System.Xml.Serialization;


namespace FinCarCom.Services.Domain.Models.Sem
{
  [XmlRoot("postresponse")]
  public class PostResponse : IPostResponse
  {
    [XmlElement("success")]
    public bool IsSuccess { get; set; }

    [XmlElement("id")]
    public string Id { get; set; }

    [XmlElement("duration")]
    public double Duration { get; set; }

    [XmlElement("rejectedreason")]
    public string RejectedReason { get; set; }
  }
}