using System.Linq;
using FinCarCom.Services;
using FinCarCom.Services.Common;


namespace FinCarCom
{
  public class CacheableComponents
  {
    public static void WarmThemUp()
    {
      // Service Layer : Call Warm() on all ICacheable types.
      ServiceLocator.GetAll<ICacheable>().ToList().ForEach(cache => cache.Warm());
    }
  }
}