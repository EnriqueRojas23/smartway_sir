

using QueryContracts.Common;
using System;
using System.Collections.Generic;
    
namespace QueryContracts.Smartway.Reparacion.Results
{
    public class ListarOrdenTrabajoDetalleResult : QueryResult
    {
        public IEnumerable<ListarOrdenTrabajoDetalleDto> Hits { get; set; }
    }
    public class ListarOrdenTrabajoDetalleDto
    {
        public long idordentrabajodetalle { get; set; }
        public string descripcion { get; set; }
        public int iddiagnostico { get; set; }
        public int idreparacion { get; set; }
        public int idrepuesto { get; set; }
        public decimal costo { get; set; }
        public string diagnostico { get; set; }
        public string reparacion { get; set; }
        public string repuesto { get; set; }
        public long idinventario { get; set; }
    }
}
