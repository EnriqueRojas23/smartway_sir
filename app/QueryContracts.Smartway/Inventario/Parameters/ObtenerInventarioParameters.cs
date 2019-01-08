
using QueryContracts.Common;
using System;
namespace QueryContracts.Smartway.Inventario.Parameters
{
    public class ObtenerInventarioParameters : QueryParameter
    {
        public int? idalmacen { get; set; }
        public int? idproducto { get; set; }
        public string serie { get; set; }
        public string imei { get; set; }

        public long? idinventario { get; set; }
        public int? idestado { get; set; }

    }
}
