
using QueryContracts.Common;
namespace QueryContracts.Smartway.Seguridad.Result
{
    public class GenerarPasswordResult : EliminarPaginaResult
    {
        public string password { get; set; }
        public string mail { get; set; }
    }
}
