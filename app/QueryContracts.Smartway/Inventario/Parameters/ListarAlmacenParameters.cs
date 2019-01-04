
using QueryContracts.Common;
using System;
namespace QueryContracts.Smartway.Recepcion.Parameters
{
    public class ListarAlmacenParameters : QueryParameter
    {
        public int? idsucursal { get; set; }
        public string codigoalmacen { get; set; }

    }
}
