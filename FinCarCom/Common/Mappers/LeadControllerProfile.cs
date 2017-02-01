using System;
using AutoMapper;
using FinCarCom.Controllers.Api;
using FinCarCom.Services.Domain.Models.Sem;
using FinCarCom.Services.Domain.Models.Stage;


namespace FinCarCom.Common.Mappers
{
  public class LeadControllerProfile : Profile
  {
    [Obsolete("Create a constructor and configure inside of your profile\'s constructor instead. Will be removed in 6.0")]
    protected override void Configure()
    {
      CreateMap<LeadController.Dto.LeadApiParams, PingRequest>();
      CreateMap<LeadController.Dto.LeadApiParams, PostRequest>();

      CreateMap<PingResponse, LeadController.Dto.PlacementCheckResponse>();
      CreateMap<PostResponse, LeadController.Dto.SubmitLeadResponse>();

      CreateMap<LeadController.Dto.LeadApiParams, Lead>();
    }
  }
}