
using System.ComponentModel;
using System.Configuration;
using WindowsService.Common;
namespace DistributedServices.Smartway
{
    [RunInstaller(true)]
    public class InstallerParameters : ServiceInstallerBase
    {
        public InstallerParameters()
        {
            Name = "GCSmartWay"; //ConfigurationManager.AppSettings["ServiceName"];
            DisplayName = "Servicio SmartWay"; //ConfigurationManager.AppSettings["ServiceDisplayName"];
            Description = "Servicio de Aplicacion Window SmartWay"; //ConfigurationManager.AppSettings["ServiceDescription"];
        }
    }
}
