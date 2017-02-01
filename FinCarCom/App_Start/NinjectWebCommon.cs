using System;
using System.Web;
using FinCarCom.Services;
using FinCarCom.Services.Common;
using FinCarCom.Services.Data.Impl;
using FinCarCom.Services.Domain.Services;
using Microsoft.Web.Infrastructure.DynamicModuleHelper;
using Ninject;
using Ninject.Web.Common;
using AutoMapper;
using FinCarCom.Common.Cacheability;
using FinCarCom.Common.Mappers;
using Ninject.Activation;


[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(FinCarCom.NinjectWebCommon), "Start")]
[assembly: WebActivatorEx.ApplicationShutdownMethodAttribute(typeof(FinCarCom.NinjectWebCommon), "Stop")]

namespace FinCarCom
{
  public static class NinjectWebCommon
  {
    private static readonly Bootstrapper Bootstrapper = new Bootstrapper();

    /// <summary>
    /// Starts the application
    /// </summary>
    public static void Start()
    {
      DynamicModuleUtility.RegisterModule(typeof(OnePerRequestHttpModule));
      DynamicModuleUtility.RegisterModule(typeof(NinjectHttpModule));
      Bootstrapper.Initialize(CreateKernel);
    }

    /// <summary>
    /// Stops the application.
    /// </summary>
    public static void Stop()
    {
      Bootstrapper.ShutDown();
    }

    /// <summary>
    /// Creates the kernel that will manage your application.
    /// </summary>
    /// <returns>The created kernel.</returns>
    private static IKernel CreateKernel()
    {
      var kernel = new StandardKernel();
      try
      {
        kernel.Bind<Func<IKernel>>().ToMethod(ctx => () => new Bootstrapper().Kernel);
        kernel.Bind<IHttpModule>().To<HttpApplicationInitializationHttpModule>();

        RegisterServices(kernel);
        return kernel;
      }
      catch
      {
        kernel.Dispose();
        throw;
      }
    }


    /// <summary>
    /// Load your modules or register your services here!
    /// </summary>
    /// <param name="kernel">The kernel.</param>
    private static void RegisterServices(IKernel kernel)
    {
      kernel.Bind<IDbConnectionFactory>()
        .To<SqlConnectionFactory>()
        .InThreadScope();

      kernel.Bind<ILocalCache>()
        .To<LocalCache>()
        .InSingletonScope();

      kernel.Bind<IMapper>()
        .ToProvider(new AutoMapperProvider())
        .InSingletonScope();


      kernel.Bind<ICacheable>()
        .To<VehicleSpecService>()
        .InSingletonScope();

      kernel.Bind<IVehicleSpecService>()
        .To<VehicleSpecService>()
        .InSingletonScope();

      kernel.Bind<ICacheable>()
        .To<LeadDataService>()
        .InSingletonScope();

      kernel.Bind<ILeadDataService>()
        .To<LeadDataService>()
        .InSingletonScope();

      kernel.Bind<IAffiliateProxyService>()
        .To<AffiliateProxyService>()
        .InSingletonScope();

      kernel.Bind<ISemProxyService>()
        .To<SemProxyService>()
        .InSingletonScope();

      kernel.Bind<IGeoService>()
        .To<GeoService>()
        .InSingletonScope();


      ServiceLocator.Init(kernel);
    }
  }


  public class AutoMapperProvider : Provider<IMapper>
  {
    protected override IMapper CreateInstance(IContext ctx)
    {
      return (new MapperConfiguration(cfg =>
      {
        cfg.AddProfile<LeadControllerProfile>();
        cfg.AddProfile<AppControllerProfile>();
      })).CreateMapper();
    }
  }
}