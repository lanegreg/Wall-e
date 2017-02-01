using System.Web.Optimization;
using FinCarCom.Common;

namespace FinCarCom {
  public class BundleConfig
  {
    private static readonly bool IsLocalDev = WebConfig.Get<bool>("Environment:IsLocalDev");

    // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
    public static void RegisterBundles(BundleCollection bundles)
    {
      //bundles
      //  .Add(new ScriptBundle("~/bundles/jquery")
      //    .Include("~/Scripts/jquery-2.2.2.min.js"));

      //bundles
      //  .Add(new ScriptBundle("~/bundles/jqueryvalidation")
      //    .Include("~/Scripts/jquery.validate.min.js"));

      //bundles
      //  .Add(new ScriptBundle("~/bundles/site")
      //    .Include(
      //    "~/Scripts/jquery.caret.min.js",
      //    "~/Scripts/store.js",
      //    "~/Scripts/jquery.mask.min.js",
      //    "~/Scripts/site.js"));


      //// Use the development version of Modernizr to develop with and learn from. Then, when you're
      //// ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
      //bundles.Add(new ScriptBundle("~/bundles/modernizr").Include("~/Scripts/modernizr-*"));


      bundles.Add(new ScriptBundle("~/js/bundle").Include("~/App_Assets/dist/js/bundle.js"));
      bundles.Add(new StyleBundle("~/css/bundle").Include("~/App_Assets/dist/css/global.min.css"));


      BundleTable.EnableOptimizations = !IsLocalDev;
    }
  }
}
