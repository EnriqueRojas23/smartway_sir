

using QueryContracts.Common;
using System;
    
namespace QueryContracts.Smartway.Facturacion.Results
{
    public class ObtenerComprobanteResult : QueryResult
    {
        public long iddocumentocompra { get; set; }
        public string numerocomprobante { get; set; }
        public int idtipocomprobante { get; set; }
        public bool ventalinea { get; set; }
        public long idconceptofacturacion { get; set; }
        public int idcliente { get; set; }
        public int idsucursal { get; set; }
        public string razonsocial { get; set; }
        public DateTime fechaemision { get; set; }
        public int idusuarioregistro { get; set; }
        public decimal subtotal { get; set; }
        public decimal igv { get; set; }
        public decimal total { get; set; }
        public string descripcion { get; set; }
        public string direccion { get; set; }
        public string tipocomprobante { get; set; }

    }
}
