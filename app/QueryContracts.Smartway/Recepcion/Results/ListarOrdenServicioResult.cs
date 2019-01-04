

using QueryContracts.Common;
using System;
using System.Collections.Generic;
    
namespace QueryContracts.Smartway.Reparacion.Results
{
    public class ListarOrdenServicioRecepcionResult : QueryResult
    {
        public IEnumerable<ListarOrdenServicioRecepcionDto> Hits { get; set; }
    }
    public class ListarOrdenServicioRecepcionDto
    {
        public long idordenserviciotecnico { get; set; }
        public string numeroot { get; set; }
        public string numeroordenservicio { get; set; }
        public string codigoproducto { get; set; }
        public string producto { get; set; }
        public string imei { get; set; }
        public string serie { get; set; }
        public long idordentrabajo { get; set; }
        public DateTime fechaAsignacion { get; set; }
        public string tipoordenservicio { get; set; }
        public string numeroost { get; set; }
        public string sucursalorigen { get; set; }
        public string tecnicoAsignado { get; set; }
        public string bounce { get; set; }
        public string ostidestado { get; set; }
        public string ostestado { get; set; }
        public string tiempo { get; set; }


    }
}
