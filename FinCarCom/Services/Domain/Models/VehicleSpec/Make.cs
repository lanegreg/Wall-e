using FinCarCom.Services.Domain.Models.Common;


namespace FinCarCom.Services.Domain.Models.VehicleSpec
{
  public class Make : Entity, IMake
  {
    public string Name { get; set; }
    public string PluralName { get; set; }
    public string SeoName { get; set; }
    public bool IsActive { get; set; }
  }
}