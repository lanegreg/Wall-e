using System.Web.Mvc;
using System.Web.Routing;


namespace FinCarCom {
  public class RouteConfig {
    public static void RegisterRoutes(RouteCollection routes) {
      routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

      routes.MapRoute(
        name: "App_Index",
        url: "prequalify",
        defaults: new { controller = "App", action = "Index" }
      );

      routes.MapRoute(
        name: "App_Redirect_All_To_Index",
        url: "{*url}",
        defaults: new
        {
          controller = "App",
          action = "Redirect"
        });
    }
  }
}
