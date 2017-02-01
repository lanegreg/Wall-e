using System;
using AutoMapper;
using FinCarCom.Controllers.Api;
using FinCarCom.Services.Domain.Models.Geo;
using FinCarCom.Services.Domain.Models.VehicleSpec;


namespace FinCarCom.Common.Mappers
{
  public class AppControllerProfile : Profile
  {
    [Obsolete("Create a constructor and configure inside of your profile\'s constructor instead. Will be removed in 6.0")]
    protected override void Configure()
    {
      CreateMap<AppController.Dto.CityStateZip, CityStateZip>();
      CreateMap<CityStateZip, AppController.Dto.CityStateZip>();
      CreateMap<Make, AppController.Dto.Make>();
      CreateMap<Model, AppController.Dto.Model>();
    }
  }
}