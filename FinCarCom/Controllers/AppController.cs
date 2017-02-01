using System.Linq;
using SysIO = System.IO;
using System.Web;
using System.Web.Mvc;
using AutoMapper;
using FinCarCom.Common;
using FinCarCom.Common.Cacheability;
using FinCarCom.Controllers.Filters;
using FinCarCom.Models.App;
using FinCarCom.Services;
using FinCarCom.Services.Domain.Services;
using Newtonsoft.Json;


namespace FinCarCom.Controllers {
  public class AppController : Controller
  {
    private static readonly HttpServerUtility HttpServer = System.Web.HttpContext.Current.Server;
    private static readonly string PageMeta;
    private static readonly string PurchaseModePageSequence;
    private static readonly string RefinanceModePageSequence;
    private static readonly string NoQualifyModePageSequence;
    private static readonly string RedirectUrl = WebConfig.Get<string>("NoPlacement:RedirectUrl");
    private static readonly string RedirectTtlms = WebConfig.Get<string>("NoPlacement:RedirectTtl_ms");
    private static readonly string NoPlacementCopyTextDuplicate = WebConfig.Get<string>("NoPlacement:CopyText:Duplicate");

    static AppController()
    {
      PageMeta = SysIO.File.ReadAllText(HttpServer.MapPath("~/allpagemeta.json"));
      PurchaseModePageSequence = SysIO.File.ReadAllText(HttpServer.MapPath("~/purchasepagesequence.json"));
      RefinanceModePageSequence = SysIO.File.ReadAllText(HttpServer.MapPath("~/refinancepagesequence.json"));
      NoQualifyModePageSequence = SysIO.File.ReadAllText(HttpServer.MapPath("~/noqualifypagesequence.json"));
    }


#if !DEBUG
    [Cacheability(TimeToLiveLevel = TimeToLiveLevel.Medium)]
#endif
    [Route("prequalify", Name = "App_Index"), HttpGet]
    public ActionResult Index()
    {
      var refiSourceIds = JsonConvert.SerializeObject(
        LeadDataService.RefinanceSources
          .Select(s => new {id = s.SourceId}).ToList());

      var model = new Index
      {
        RedirectUrl = RedirectUrl,
        RedirectTtlms = RedirectTtlms,
        NoPlacementCopyTextDuplicate = NoPlacementCopyTextDuplicate,
        PageMeta = PageMeta,
        PurchaseModePageSequence = PurchaseModePageSequence,
        RefinanceModePageSequence = RefinanceModePageSequence,
        NoQualifyModePageSequence = NoQualifyModePageSequence,
        RefinanceSourceIds = refiSourceIds,
        Makes = JsonConvert.SerializeObject(VehicleSpecService
          .GetMakes().Where(m => m.IsActive).Select(m => new {value = m.Id, label = m.Name}).ToList())
      };

      return View("Index", model);
    }

    
    public ActionResult Redirect()
    {
      return RedirectPermanent("/prequalify");
    }



    #region Services

    private static ILeadDataService LeadDataService => ServiceLocator.Get<ILeadDataService>();
    private static IVehicleSpecService VehicleSpecService => ServiceLocator.Get<IVehicleSpecService>();
    private static IMapper Mapper => ServiceLocator.Get<IMapper>();

    #endregion

  }
}