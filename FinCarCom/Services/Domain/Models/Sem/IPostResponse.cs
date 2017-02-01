

namespace FinCarCom.Services.Domain.Models.Sem
{
  public interface IPostResponse
  {
    bool IsSuccess { get; }
    string Id { get; }
    double Duration { get; }
    string RejectedReason { get; }
  }
}