

using CommandContracts.Common;
using System;

namespace CommandContracts.Smartway.Reparacion
{
    public class InsertarActualizarOrdenTrabajoTiempoCommand : Command
    {
        public long? idordentrabajotiempo { get; set; }
        public long idordentrabajo { get; set; }
        public int idusuario { get; set; }
        public DateTime? fechahorainicio { get; set; }
        public DateTime? fechahorafin { get; set; }
        public int __tipoperacion { get; set; }
    }
}
