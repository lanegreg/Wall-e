using System.Threading.Tasks;
using FinCarCom.Services.Domain.Models.Affiliate;


namespace FinCarCom.Services.Domain.Services
{
  public interface IAffiliateProxyService
  {
    Task<IPingResponse> PlacementCheckAsync(IPingRequest request);
    Task<IPostResponse> SubmitLeadAsync(IPostRequest request);
  }
}