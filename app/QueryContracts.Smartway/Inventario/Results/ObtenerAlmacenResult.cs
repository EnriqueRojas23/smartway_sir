

using QueryContracts.Common;
using System;
using System.Collections.Generic;
    
namespace QueryContracts.Smartway.Inventario.Results
{
    public class ObtenerAlmacenResult : QueryResult
    {
        public int idalmacen { get; set; }
        public string codigoalmacen { get; set; }
        public string nombrealmacen { get; set; }
        public int idsucursal { get; set; }
        public int idtipoalmacen { get; set; }
    }
}
