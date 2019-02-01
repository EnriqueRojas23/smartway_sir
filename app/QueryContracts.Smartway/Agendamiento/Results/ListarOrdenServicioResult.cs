

using QueryContracts.Common;
using System;
using System.Collections.Generic;
    
namespace QueryContracts.Smartway.Agendamiento.Results
{
    public class ListarOrdenServicioResult : QueryResult
    {
        public IEnumerable<ListarOrdenServicioDto> Hits { get; set; }
    }
    public class ListarOrdenServicioDto
    {
        public long idordenserviciotecnico { get; set; }
        public string numeroost { get; set; }
        public string numeroincidencia { get; set; }
        public string codigoproducto { get; set; }
        public string producto { get; set; }
        public string tipoordenservicio { get; set; }
        //public string numeroost { get; set; }
        public string sucursalorigen { get; set; }
        public string sucursaldestino { get; set; }

        public string nombrecliente { get; set; }
        public string numerodocumento { get; set; }

        public string estado { get; set; }

        public string serie { get; set; }
        public string imei { get; set; }

        public string accesorios { get; set; }
        public string modelo { get; set; }

    }
}
