
using QueryContracts.Common;
using System;
namespace QueryContracts.Smartway.Agendamiento.Parameters
{
    public class ListarOrdenServicioParameters : QueryParameter
    {
        public int? idtipoordenservicio { get; set; }
        public int? idestado { get; set; }
        public string fecini { get; set; }
        public string fecfin { get; set; }
        public string numeroordenservicio { get; set; }

    }
}
