using System;

namespace Web.Smartway.Areas.Agendamiento.Models
{
    public class ComprobanteModel
    {
        public long? iddocumentocompra { get; set; }
        public string numerocomprobante { get; set; }
        public int idconceptofacturacion { get; set; }
        public int idtipodocumentocompra { get; set; }
        public bool ventaenlinea { get; set; }
        public string descripcion { get; set; }
        public int idcliente { get; set; }
        public string nombrecliente { get; set; }
        public DateTime fechaemision { get; set; }
        public DateTime fechahoraregistro { get; set; }
        public string _fechaemision { get; set; }
        public int idusuarioregistro { get; set; }
        public decimal subtotal { get; set; }
        public decimal igv { get; set; }
        public decimal? total { get; set; }
        public string tipodocumentocompra { get; set; }
        public int? idsucursalventa { get; set; }
        public bool ventapartner { get; set; }
        public int idestado { get; set; }
        public int idpartner { get; set; }
        public int idproducto { get; set; }
    }

    public class DetalleComprobanteModel : ComprobanteModel
    {
        public long? iddetallecomprobantecliente { get; set; }
        public int idproducto { get; set; }
        public string serie { get; set; }
        public string imei { get; set; }
        public string mac { get; set; }
        public int cantidad { get; set; }
        //public decimal subtotal { get; set; }
        //public decimal igv { get; set; }
        //public decimal total { get; set; }
        public decimal descuento { get; set; }
        public string codigoproducto { get; set; }
        public string descripcionlarga { get; set; }
        public string garantia { get; set; }
        public bool engarantia { get; set; }
    }
}