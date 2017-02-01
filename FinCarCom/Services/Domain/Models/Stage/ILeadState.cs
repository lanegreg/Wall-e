

namespace FinCarCom.Services.Domain.Models.Stage
{
  public interface ILeadState
  {
    ILeadState SetSuccessfulPlacementCheck(bool state);
    ILeadState SetSuccessfulLeadSubmission(bool state);
    ILeadState SetIpAddress(string ipAddress);
  }
}