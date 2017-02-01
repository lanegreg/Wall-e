using System;
using System.Net.Http;
using System.Threading.Tasks;
using Elmah;
using FinCarCom.Common;
using FinCarCom.Services.Domain.Models.Affiliate;
using FinCarCom.Services.Domain.Services;


namespace FinCarCom.Services.Data.Impl
{
  public class AffiliateProxyService : IAffiliateProxyService
  {
    private static readonly string AffiliateServiceEndpoint = 
      $"http://{WebConfig.Get<string>("AffiliateService:Endpoint").Replace("http://", "")}";



    public async Task<IPingResponse> PlacementCheckAsync(IPingRequest request)
    {
      var urlString = $"{AffiliateServiceEndpoint}/Ping?{request.ToQuerystring()}";
      var xmlString = await new HttpClient().GetStringAsync(new Uri(urlString)).ConfigureAwait(false);
      var pingResponse = XmlConvert.DeserializeObject<PingResponse>(StripNamespacesFromPingResponseRoot(xmlString));

      if (!pingResponse.IsSuccess)
      {
        ErrorSignal.FromCurrentContext().Raise(new Exception($"AffiliateProxyService:PlacementCheckAsync - {pingResponse.RejectedReason} | {request.ToQuerystring()}"));
      }

      return pingResponse;
    }


    public async Task<IPostResponse> SubmitLeadAsync(IPostRequest request)
    {
      var urlString = $"{AffiliateServiceEndpoint}/Post?{request.ToQuerystring()}";
      var xmlString = await new HttpClient().GetStringAsync(new Uri(urlString)).ConfigureAwait(false);
      var postResponse = XmlConvert.DeserializeObject<PostResponse>(StripNamespacesFromPostResponseRoot(xmlString));

      if (!postResponse.IsSuccess)
      {
        ErrorSignal.FromCurrentContext().Raise(new Exception($"AffiliateProxyService:SubmitLeadAsync - {postResponse.RejectedReason} | {request.ToQuerystring()}"));
      }

      return postResponse;
    }



    #region Private Funcs

    private static string StripNamespacesFromPingResponseRoot(string xmlString)
    {
      return StripNamespacesFromRoot(xmlString, "pingresponse");
    }

    private static string StripNamespacesFromPostResponseRoot(string xmlString)
    {
      return StripNamespacesFromRoot(xmlString, "postresponse");
    }

    private static string StripNamespacesFromRoot(string xmlString, string rootName)
    {
      var head = xmlString.IndexOf(rootName, StringComparison.Ordinal);
      var tail = xmlString.IndexOf(">", head, StringComparison.Ordinal);
      var spanOfText = xmlString.Substring(head, tail - head).Replace(rootName, String.Empty);

      return xmlString.Replace(spanOfText, String.Empty);
    }

    #endregion
  }
}