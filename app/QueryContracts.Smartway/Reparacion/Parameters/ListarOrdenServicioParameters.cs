
using QueryContracts.Common;
using System;
namespace QueryContracts.Smartway.Reparacion.Parameters
{
    public class ListarOrdenServicioParameters : QueryParameter
    {

        public int? idestado { get; set; }
        public string fechainicio { get; set; }
        public string fechafin { get; set; }
        public string numeroordenservicio { get; set; }
        public int? idtecnico { get; set; }
        public string serie { get; set; }
        public int? idsupervisor { get; set; }
    }
}
