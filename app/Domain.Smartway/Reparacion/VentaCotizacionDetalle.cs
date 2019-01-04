

using Domain.Common;
using System;
using System.ComponentModel.DataAnnotations;
namespace Domain.Smartway.Reparacion
{
    public class VentaCotizacionDetalle : Entity
    {

        [Key]
        public long idcotizaciondetalle { get; set; }
        public long idcotizacion { get; set; }
        public int idproducto { get; set; } // tambien puede ser repuesto
        public int cantidad { get; set; }
        public int costounitario { get; set; }
        public int descuentounitario { get; set; }
        public int costototal { get; set; }
        public int iddiagnostico { get; set; }
        public int idreparacion { get; set; }
        public string descripcion { get; set; }
    }
}
