

using QueryContracts.Common;
using System;
using System.Collections.Generic;
    
namespace QueryContracts.Smartway.Inventario.Results
{
    public class ObtenerProductoInventarioResult : QueryResult
    {
        public long idinventario { get; set; }
        public int idestado{ get; set; }
        public string caja { get; set; }
        public string pallet { get; set; }
        public string ubicacion { get; set; }
        public int idalmacen { get; set; }
    }
}
