

using QueryContracts.Common;
using System;
using System.Collections.Generic;
    
namespace QueryContracts.Smartway.Reparacion.Results
{
    public class ListarAlmacenResult : QueryResult
    {
        public IEnumerable<ListarAlmacenDto> Hits { get; set; }
    }
    public class ListarAlmacenDto
    {
        public int idalmacen { get; set; }
        public string codigoalmacen { get; set; }
        public string nombrealmacen { get; set; }
        public int idsucursal { get; set; }
        public int idtipoalmacen { get; set; }
        public string sucursal { get; set; }
        public string tipoalmacen { get; set; }
    }
}
