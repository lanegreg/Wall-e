﻿

namespace FinCarCom.Common.Extensions
{
  public static class BoolExtensions
  {
    public static string ToString(this bool? v, string trueString, string falseString, string nullString = "Undefined")
    {
      return v == null ? nullString : v.Value ? trueString : falseString;
    }
    public static string ToString(this bool v, string trueString, string falseString)
    {
      return ToString(v, trueString, falseString, null);
    }
  }
}