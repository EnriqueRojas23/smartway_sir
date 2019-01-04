
using QueryContracts.Common;
using System;
namespace QueryContracts.Smartway.Inventario.Parameters
{
    public class ObtenerProductoInventarioParameters : QueryParameter
    {
        public int idproducto { get; set; }
        public string imei { get; set; }
        public string serie { get; set; }

    }
}
