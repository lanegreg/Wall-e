using System;
using System.Web;

namespace FinCarCom.Common.Extensions
{
  public static class HttpRequestExtensions
  {
    public static bool ConnectionIsSecureOrTerminatedSecure(this HttpRequestBase req)
    {
      if (req.Headers["X-Forwarded-Proto"] == "https")
        req.ServerVariables["HTTPS"] = "on";

      return req.IsSecureConnection;
    }

    public static string OriginatingClientIpAddress(this HttpRequest req)
    {
      var ipAddress = (req.ServerVariables["HTTP_X_TRUE_CLIENT_IP"] ??
                       req.ServerVariables["HTTP_X-FORWARDED-FOR"] ??
                       String.Empty).Split(',')[0].Trim();

      return ipAddress.IsNotNullOrEmpty() ? ipAddress : String.Empty;
    }
  }
}