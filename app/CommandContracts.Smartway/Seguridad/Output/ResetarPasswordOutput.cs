
using CommandContracts.Common;
namespace CommandContracts.Smartway.Seguridad.Output
{
    public class ResetarPasswordOutput : CommandResult
    {
        public string PasswordClaro { get; set; }
        public string Nombres { get; set; }
        public string Correo { get; set; }
        public string Usuario { get; set; }
    }
}
