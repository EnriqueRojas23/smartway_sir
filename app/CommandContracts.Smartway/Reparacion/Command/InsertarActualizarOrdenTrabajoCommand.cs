

using CommandContracts.Common;
using System;

namespace CommandContracts.Smartway.Reparacion
{
    public class InsertarActualizarOrdenTrabajoCommand : Command
    {
        public long? idordentrabajo { get; set; }
        public string numeroordentrabajo { get; set; }
        public int idtecnico { get; set; }
        public int idordenserviciotecnico { get; set; }
        public bool incidencia { get; set; }
        public int bounce { get; set; }
        public bool detenida { get; set; }
        public int idestado { get; set; }
        public DateTime fechahoraregistro { get; set; }
        public int idusuarioregistro { get; set; }
        public string descripcion { get; set; }
        public string informetecnico { get; set; }
        public int __tipooperacion { get; set; }

    }
}
