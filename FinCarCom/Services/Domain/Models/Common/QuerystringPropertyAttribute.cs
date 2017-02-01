using System;


namespace FinCarCom.Services.Domain.Models.Common
{
  public class QuerystringPropertyAttribute : Attribute
  {
    public QuerystringPropertyAttribute(string name)
    {
      Name = name;
    }

    public string Name { get; set; }
  }
}