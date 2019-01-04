

using QueryContracts.Common;
using System;
using System.Collections.Generic;
    
namespace QueryContracts.Smartway.Reparacion.Results
{
    public class ListarOrdenServicioResult : QueryResult
    {
        public IEnumerable<ListarOrdenServicioDto> Hits { get; set; }
    }
    public class ListarOrdenServicioDto  
    {
        public long idordenserviciotecnico { get; set; }
        public string numeroot { get; set; }
        public string codigoproducto { get; set; }
        public string producto { get; set; }
        public string imei { get; set; }
        public string serie { get; set; }
        public long? idordentrabajo { get; set; }
        public DateTime? fechaAsignacion { get; set; }
        public string tipoordenservicio { get; set; }
        public string numeroost { get; set; }
        public string sucursalorigen { get; set; }
        public string tecnicoAsignado { get; set; }
        public bool bounce { get; set; }
        public int idestado { get; set; }
        public string ostestado { get; set; }
        public string otestado { get; set; }
        public string tiempo { get; set; }
        public bool engarantia { get; set; }
        public string mac { get; set; }
        public int idtipoproducto { get; set; }
        
    }
}
