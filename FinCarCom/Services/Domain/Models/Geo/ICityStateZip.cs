namespace FinCarCom.Services.Domain.Models.Geo
{
  public interface ICityStateZip
  {
    string City { get; }
    string State { get; }
    string Zip { get; }
  }
}