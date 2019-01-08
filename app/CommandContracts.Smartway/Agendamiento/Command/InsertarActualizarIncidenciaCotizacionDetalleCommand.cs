

using CommandContracts.Common;
using System;

namespace CommandContracts.Smartway.Agendamiento
{
    public class InsertarActualizarIncidenciaCotizacionDetalleCommand : Command
    {
        public long? idcotizaciondetalle { get; set; }
        public long idcotizacion { get; set; }
        public string descripcion { get; set; }
        public int iddiagnostico { get; set; }
        public int idreparacion { get; set; }
        public int idrepuesto { get; set; }
        public decimal costo { get; set; }



    }
}
