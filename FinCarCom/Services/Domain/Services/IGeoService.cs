using System.Collections.Generic;
using FinCarCom.Services.Domain.Models.Geo;


namespace FinCarCom.Services.Domain.Services
{
  public interface IGeoService
  {
    IEnumerable<ICityStateZip> GetCityStatesByZip(string zipcode);
    bool VerifyZipcode(string zipcode);
  }
}