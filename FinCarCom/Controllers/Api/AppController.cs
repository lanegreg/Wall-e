using System;
using System.ComponentModel;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;
using AutoMapper;
using FinCarCom.Common.Cacheability;
using FinCarCom.Controllers.Filters;
using FinCarCom.Services;
using FinCarCom.Services.Domain.Services;
using Newtonsoft.Json;


namespace FinCarCom.Controllers.Api
{
  [RoutePrefix("api")]
  public class AppController : ApiController
  {
    #region Declarations

    private static readonly HttpServerUtility Server = HttpContext.Current.Server;
    private static readonly string PrivacyPolicyContent;
    private static readonly string FraudAlertContent;
    private static readonly string UsageTermsContent;
    private static readonly string CorpInfoContent;
    private static readonly string IntellPropContent;

    #endregion


    static AppController()
    {
      var overlayContentPath = Server.MapPath("~/Views/OverlayContent");
      PrivacyPolicyContent = File.ReadAllText(Path.Combine(overlayContentPath, "PrivacyPolicy.html"));
      FraudAlertContent = File.ReadAllText(Path.Combine(overlayContentPath, "FraudAlert.html"));
      UsageTermsContent = File.ReadAllText(Path.Combine(overlayContentPath, "UsageTerms.html"));
      CorpInfoContent = File.ReadAllText(Path.Combine(overlayContentPath, "CorpInfo.html"));
      IntellPropContent = File.ReadAllText(Path.Combine(overlayContentPath, "IntellProp.html"));
    }



    
#if !DEBUG
    [Cacheability(TimeToLiveLevel = TimeToLiveLevel.Medium)]
#endif
    [Route("app/overlay-content", Name = "GetOverlayContent"), HttpGet]
    public IHttpActionResult GetOverlayContent()
    {
      return Ok(new Dto.OverlayContent
      {
        PrivacyPolicy = PrivacyPolicyContent,
        FraudAlert = FraudAlertContent,
        UsageTerms = UsageTermsContent,
        CorpInfo = CorpInfoContent,
        IntellProp = IntellPropContent
      });
    }



#if !DEBUG
    [Cacheability(TimeToLiveLevel = TimeToLiveLevel.Medium)]
#endif
    [Route("geo/zipcode/{zipcode}", Name = "GetCityStatesByZip"), HttpGet]
    public object GetCityStatesByZip(string zipcode)
    {
      var cityStateZip = GeoService.GetCityStatesByZip(zipcode ?? String.Empty)
        .Select(csz => Mapper.Map<Dto.CityStateZip>(csz))
        .FirstOrDefault();


      return new
      {
        isKosher = cityStateZip != null,
        query = zipcode,
        cityStateZip
      };
    }



#if !DEBUG
    [Cacheability(TimeToLiveLevel = TimeToLiveLevel.Medium)]
#endif
    [Route("vspec/makes", Name = "GetMakes"), HttpGet]
    public object GetMakes()
    {
      return new
      {
        isKosher = true,
        makes = VehicleSpecService.GetMakes().Select(make => Mapper.Map<Dto.Make>(make))
      };
    }


#if !DEBUG
    [Cacheability(TimeToLiveLevel = TimeToLiveLevel.Medium)]
#endif
    [Route("vspec/make/{id}/models", Name = "GetModelsByMakeId"), HttpGet]
    public object GetModelsByMakeId(int id)
    {
      return new
      {
        isKosher = true,
        makeId = id,
        models = VehicleSpecService.GetModelsByMakeId(id).Select(model => Mapper.Map<Dto.Model>(model))
      };
    }



    #region Services

    private static IGeoService GeoService => ServiceLocator.Get<IGeoService>();
    private static IVehicleSpecService VehicleSpecService => ServiceLocator.Get<IVehicleSpecService>();
    private static IMapper Mapper => ServiceLocator.Get<IMapper>();
    
    #endregion

    

    public static class Dto
    {
      internal class Make
      {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }
      }

      internal class Model
      {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }
      }

      internal class OverlayContent
      {
        [JsonProperty("privacyPolicy")]
        public string PrivacyPolicy { get; set; }

        [JsonProperty("fraudAlert")]
        public string FraudAlert { get; set; }

        [JsonProperty("usageTerms")]
        public string UsageTerms { get; set; }

        [JsonProperty("corpInfo")]
        public string CorpInfo { get; set; }

        [JsonProperty("intellProp")]
        public string IntellProp { get; set; }
      }

      internal class CityStateZip
      {
        [DefaultValue("")]
        [JsonProperty("city", DefaultValueHandling = DefaultValueHandling.Populate)]
        public string City { get; set; }

        [DefaultValue("")]
        [JsonProperty("state", DefaultValueHandling = DefaultValueHandling.Populate)]
        public string State { get; set; }

        [DefaultValue("")]
        [JsonProperty("zip", DefaultValueHandling = DefaultValueHandling.Populate)]
        public string Zip { get; set; }
      }
    }
  }
}
