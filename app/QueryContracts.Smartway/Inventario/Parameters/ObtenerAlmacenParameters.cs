
using QueryContracts.Common;
using System;
namespace QueryContracts.Smartway.Inventario.Parameters
{
    public class ObtenerAlmacenParameters : QueryParameter
    {
        public int? idalmacen { get; set; }
        public string codigo { get; set; }

    }
}
