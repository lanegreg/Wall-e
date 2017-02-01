using System.Threading.Tasks;
using FinCarCom.Services.Domain.Models.Sem;


namespace FinCarCom.Services.Domain.Services
{
  public interface ISemProxyService
  {
    Task<IPingResponse> PlacementCheckAsync(IPingRequest request);
    Task<IPostResponse> SubmitLeadAsync(IPostRequest request);
  }
}