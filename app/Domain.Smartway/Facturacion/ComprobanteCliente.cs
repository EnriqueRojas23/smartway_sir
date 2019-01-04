

using Domain.Common;
using System;
using System.ComponentModel.DataAnnotations;
namespace Domain.Smartway.Facturacion
{
    public class ComprobanteCliente : Entity
    {
        [Key]
        public long iddocumentocompra { get; set; }
        public string numerocomprobante { get; set; }
        public int idtipodocumentocompra { get; set; }
        public int idcliente { get; set; }
        public int? idsucursalventa { get; set; }
        public bool ventaenlinea { get; set; }
        public int idconceptofacturacion { get; set; }
        public string descripcion { get; set; }
        public decimal subtotal { get; set; }
        public decimal igv { get; set; }
        public decimal total { get; set; }
        public int idestado { get; set; }
        public DateTime fechaemision { get; set; }
        public DateTime fechahoraregistro { get; set; }
        public int idusuarioregistro { get; set; }
        public bool ventapartner { get; set; }
        public int? idpartner { get; set; }
    }
}
