using FinCarCom.Tests.Common.Data;
using Ninject.Modules;


namespace FinCarCom.Tests.Common
{
  class TestNinjectModule : NinjectModule
  {
    public override void Load()
    {
      Bind<IDbConnectionFactory>()
        .To<SqlConnectionFactory>();
    }
  }
}
