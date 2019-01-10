

using QueryContracts.Common;
using System;
using System.Collections.Generic;
    
namespace QueryContracts.Smartway.Reparacion.Results
{
    public class ListarOrdenTrabajoTiempoResult : QueryResult
    {
        public IEnumerable<ListarOrdenTrabajoTiempoDto> Hits { get; set; }
    }
    public class ListarOrdenTrabajoTiempoDto
    {
        public long idordentrabajotiempo { get; set; }
        public long idordentrabajo { get; set; }
        public int idusuario { get; set; }
        public DateTime fechahorainicio{ get; set; }
        public DateTime fechahorafin { get; set; }
        public string serie { get; set; }
        public int iteracion { get; set; }
    }
}
