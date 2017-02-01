using System.Collections.Generic;
using System.Threading.Tasks;
using FinCarCom.Services.Domain.Models.Stage;


namespace FinCarCom.Services.Domain.Services
{
  public interface ILeadDataService
  {
    IEnumerable<Source> RefinanceSources { get; }

    Task<ILead> SaveAsync(ILead lead);
    ILead Save(ILead lead);

    Task<ILead> GetLeadByIdAsync(int id);
    ILead GetLeadById(int id);

    ILeadDataService SetSuccessfulPlacementCheck(ILead lead, bool state);
    ILeadDataService SetSuccessfulLeadSubmit(ILead lead, bool state);
    ILeadDataService SetIpAddress(ILead lead, string ipAddress);
  }
}