using System;
using System.Linq;
using FinCarCom.Common.Extensions;


namespace FinCarCom.Services.Domain.Models.Common
{
  public class QuerystringBase : IQuerystringable
  {
    private static readonly string QuerystringPropAttribName = typeof (QuerystringPropertyAttribute).Name;
    private static readonly string IgnorePropAttribName = typeof(IgnoreAttribute).Name;


    public string ToQuerystring()
    {
      var keyValues = this.GetType().GetProperties()
        .Where(pInfo => pInfo.CanRead || pInfo.GetValue(this, null) != null)
        .Where(pInfo => pInfo.CustomAttributes.FirstOrDefault(t => t.AttributeType.Name == IgnorePropAttribName) == null)
        .Select(pInfo =>
        {
          var querystringAttrib = pInfo.CustomAttributes.FirstOrDefault(t => t.AttributeType.Name == QuerystringPropAttribName);
          var isBoolType = pInfo.PropertyType.Name == "Boolean";
          var propValue = pInfo.GetValue(this, null);

          return new
          {
            Key = querystringAttrib?.ConstructorArguments.First().Value.ToString() ?? pInfo.Name,
            Value = isBoolType ? Boolean.Parse(propValue.ToString()).ToString("true", "false") : propValue.ToString()
          };
        });


      // Concat all key/value pairs into a string separated by ampersand
      return string.Join("&", keyValues
          .Select(kv => string.Concat(
              Uri.EscapeDataString(kv.Key), "=",
              Uri.EscapeDataString(kv.Value))));
    }
  }
}