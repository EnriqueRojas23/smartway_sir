
using QueryContracts.Common;
using System;
namespace QueryContracts.Smartway.Inventario.Parameters
{
    public class ListarInventarioxAlmacenParameters : QueryParameter
    {
        public int idalmacen { get; set; }
        public int? idproducto { get; set; }
        public string serie { get; set; }
        public string imei { get; set; }

    }
}
