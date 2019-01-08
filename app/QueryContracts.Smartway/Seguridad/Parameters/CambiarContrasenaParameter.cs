

using QueryContracts.Common;
namespace QueryContracts.Smartway.Seguridad.Parameters
{
    public class CambiarContrasenaParameter : QueryParameter
    {
        public int IdUsuario { get; set; }
        public string password { get; set; }

    }
}
