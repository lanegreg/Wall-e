

namespace FinCarCom.Services.Domain.Models.Affiliate
{
  public interface IPingResponse
  {
    bool IsSuccess { get; }
    string SessionId { get; }
    double Duration { get; }
    string RejectedReason { get; }
  }
}