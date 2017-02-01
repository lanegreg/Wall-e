using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Routing;


namespace FinCarCom
{
  public static class WebApiConfig
  {
    // Ref: http://www.asp.net/web-api/overview/web-api-routing-and-actions/attribute-routing-in-web-api-2
    public static void Register(HttpConfiguration config)
    {
      var resolver = new DefaultInlineConstraintResolver();

      config.MapHttpAttributeRoutes(resolver);
      config.Formatters.JsonFormatter
        .SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));

      //config.MapHttpAttributeRoutes();
      //config.Routes.MapHttpRoute(
      //  name: "DefaultApi",
      //  routeTemplate: "api/{controller}/{id}",
      //  defaults: new {id = RouteParameter.Optional}
      //  );
    }
  }
}
