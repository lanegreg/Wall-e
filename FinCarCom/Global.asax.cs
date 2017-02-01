using System.Web;
using System.Web.Http;
using System.Web.Optimization;
using System.Web.Routing;


namespace FinCarCom {
  
  public class MvcApplication : HttpApplication {
    protected void Application_Start() {
      CacheableComponents.WarmThemUp();
      GlobalConfiguration.Configure(WebApiConfig.Register);
      RouteConfig.RegisterRoutes(RouteTable.Routes);
      BundleConfig.RegisterBundles(BundleTable.Bundles);
    }
  }
}
