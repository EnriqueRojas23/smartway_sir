using System;
using System.Collections.Generic;
using Web.Smartway.Areas.Agendamiento.Models;

namespace Web.Smartway.Areas.Reparacion.Models
{
    public class VentaCotizacionModel : InfoOrdenModel
    {
        public long? idcotizacion { get; set; }
        public long idordenservicio { get; set; }
        public int idcliente { get; set; }
        public decimal tipocambio { get; set; }
        public int idmoneda { get; set; }
        public int idsucursal { get; set; }
        public bool? notacredito { get; set; }
        public int? idnotacredito { get; set; }
        public decimal? descuento { get; set; }
        public decimal? descuentonotacredito { get; set; }
        public decimal subtotal { get; set; }
        
        public string str_subtotal { get; set; }
        public decimal igv { get; set; }
        public string str_igv { get; set; }
        public decimal total { get; set; }
        public string str_total { get; set; }
        public bool? aceptado { get; set; }
        public bool? generoventa { get; set; }
        public DateTime fechahoraregistro { get; set; }
        public int idusuarioregistro { get; set; }
        public IEnumerable<VentaCotizacionDetalleModel> Detalles { get; set; }
        public int idestado { get; set; }

        public int iddiagnostico { get; set; }
        public int idreparacion { get; set; }
        public int idrepuesto { get; set; }

        public int idtipoproducto { get; set; }
        public int idfabricante { get; set; }
        public int idproducto { get; set; }
        public int idpartner { get; set; }
        public long idordentrabajo { get; set; }

        public int __tipooperacion { get; set; }        

    }

    public class VentaCotizacionDetalleModel
    {
        public long? idcotizaciondetalle { get; set; }
        public long idcotizacion { get; set; }
        public int idproducto { get; set; } // tambien puede ser repuesto
        public int cantidad { get; set; }
        public int costounitario { get; set; }
        public int descuentounitario { get; set; }
        public decimal costototal { get; set; }
        public int iddiagnostico { get; set; }
        public int idreparacion { get; set; }
        public string descripcion { get; set; }
        public string diagnostico { get; set; }
        public string reparacion { get; set; }
        public int idrepuesto { get; set; }
        public int index { get; set; }
        public string repuesto { get; set; }
    }
}
