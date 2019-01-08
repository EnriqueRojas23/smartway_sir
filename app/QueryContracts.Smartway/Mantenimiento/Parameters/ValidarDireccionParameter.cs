
using QueryContracts.Common;
namespace QueryContracts.Smartway.Mantenimiento.Parameters
{
    public class ValidarDireccionParameter : QueryParameter
    {
        public int idcliente { get; set; }
        public string codigo { get; set; }
    }
}
