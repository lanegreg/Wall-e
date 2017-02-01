
namespace FinCarCom.Services.Domain.Models.VehicleSpec
{
  public interface IMake
  {
    int Id { get; }
    string Name { get; }
    string PluralName { get; }
    string SeoName { get; }
    bool IsActive { get; }
  }
}