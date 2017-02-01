using System;


namespace FinCarCom.Common.Extensions
{
  public static class StringExtensions
  {
    public static bool IsNullOrEmpty(this string str)
    {
      return String.IsNullOrEmpty(str);
    }

    public static bool IsNotNullOrEmpty(this string str)
    {
      return !String.IsNullOrEmpty(str);
    }
  }
}