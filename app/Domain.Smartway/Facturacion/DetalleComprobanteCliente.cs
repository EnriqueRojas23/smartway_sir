

using Domain.Common;
using System;
using System.ComponentModel.DataAnnotations;
namespace Domain.Smartway.Facturacion
{
    public class DetalleComprobanteCliente : Entity
    {
        [Key]
        public long iddetallecomprobantecliente { get; set; }
        public int iddocumentocompra { get; set; }
        public int idproducto { get; set; }
        public string serie { get; set; }
        public string imei { get; set; }
        public string mac { get; set; }
        public int cantidad { get; set; }
        public decimal subtotal { get; set; }
        public decimal descuento { get; set; }
        public decimal igv { get; set; }
        public decimal total { get; set; }
    }
}
