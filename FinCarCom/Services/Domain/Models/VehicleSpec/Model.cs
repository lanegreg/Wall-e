using FinCarCom.Services.Domain.Models.Common;


namespace FinCarCom.Services.Domain.Models.VehicleSpec
{
  public class Model : Entity, IModel
  {
    public string Name { get; set; }
    public string SeoName { get; set; }
    public int MakeId { get; set; }
  }
}