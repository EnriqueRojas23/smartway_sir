
using QueryContracts.Common;
namespace QueryContracts.Smartway.Mantenimiento.Parameters
{
    public class ObtenerProductoParameter : QueryParameter
    {
        public int? idproducto { get; set; }
        public string codigoproducto { get; set; }
    }
}
