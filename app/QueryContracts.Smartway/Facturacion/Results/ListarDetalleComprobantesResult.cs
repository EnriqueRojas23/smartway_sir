

using QueryContracts.Common;
using System;
using System.Collections.Generic;
    
namespace QueryContracts.Smartway.Facturacion.Results
{
    public class ListarDetalleComprobantesResult : QueryResult
    {
        public IEnumerable<ListarDetalleComprobantesDto> Hits { get; set; }
    }
    public class ListarDetalleComprobantesDto
    {
        public long iddetallecomprobantecliente { get; set; }
        public long iddocumentocompra { get; set; }
        public int idproducto { get; set; }
        public string codigoproducto { get; set; }
        public string descripcionlarga { get; set; }
        public string serie { get; set; }
        public string imei { get; set; }
        public string mac { get; set; }
        public int cantidad { get; set; }
        public decimal subtotal { get; set; }
        public decimal descuento { get; set; }
        public decimal igv { get; set; }
        public decimal total { get; set; }  
        public int idsucursalventa { get; set; }
        public DateTime fechaemision { get; set; }
        public bool ventapartner { get; set; }

    }
}
