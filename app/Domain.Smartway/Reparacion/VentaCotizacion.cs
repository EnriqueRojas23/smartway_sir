

using Domain.Common;
using System;
using System.ComponentModel.DataAnnotations;
namespace Domain.Smartway.Reparacion
{
    public class VentaCotizacion : Entity
    {

        [Key]
        public long idcotizacion { get; set; }
        public long idordenservicio { get; set; }
        public int idcliente { get; set; }
        public decimal? tipocambio { get; set; }
        public int idmoneda { get; set; }
        public int idsucursal { get; set; }
        public bool? notacredito { get; set; }
        public int? idnotacredito { get; set; }
        public decimal? descuento { get; set; }
        public decimal? descuentonotacredito { get; set; }
        public decimal subtotal { get; set; }
        public decimal igv { get; set; }
        public decimal total { get; set; }
        public bool? aceptado { get; set; }
        public bool generoventa { get; set; }
        public DateTime fechahoraregistro { get; set; }
        public int idusuarioregistro { get; set; }

    }
}
