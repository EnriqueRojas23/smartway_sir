

using CommandContracts.Common;
using System;

namespace CommandContracts.Smartway.Reparacion
{
    public class InsertarActualizarVentaCotizacionDetalleCommand : Command
    {
        public long? idcotizaciondetalle { get; set; }
        public long idcotizacion { get; set; }
        public int idproducto { get; set; }
        public int cantidad { get; set; }
        public int costounitario { get; set; }
        public int descuentounitario { get; set; }
        public int costototal { get; set; }
        public int iddiagnostico { get; set; }
        public int idreparacion { get; set; }
        public string descripcion { get; set; }

    }
}
