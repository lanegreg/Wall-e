 

namespace FinCarCom.Services.Domain.Models.Geo
{
  public class CityStateZip : ICityStateZip
  {
    public string City { get; set; }
    public string State { get; set; }
    public string Zip { get; set; }
  }
}