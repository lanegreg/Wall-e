using System.Collections.Generic;
using FinCarCom.Services.Domain.Models.VehicleSpec;


namespace FinCarCom.Services.Domain.Services
{
  public interface IVehicleSpecService
  {
    IEnumerable<IMake> GetMakes();
    IEnumerable<IModel> GetModelsByMakeId(int id);
  }
}