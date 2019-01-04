

using QueryContracts.Common;
using System;
using System.Collections.Generic;
    
namespace QueryContracts.Smartway.Facturacion.Results
{
    public class ListarComprobantesResult : QueryResult
    {
        public IEnumerable<ListarComprobantesDto> Hits { get; set; }
    }
    public class ListarComprobantesDto  
    {
        public long iddocumentocompra { get; set; }
        public string numerocomprobante { get; set; }
        public string tipodocumentocompra { get; set; }
        public int idtipodocumentocompra { get; set; }
        public int idcliente { get; set; }
        public DateTime fechaemision { get; set; }
        public int idusuarioregistro { get; set; }
        public decimal subtotal { get; set; }
        public decimal igv { get; set; }
        public decimal total { get; set; }
        public string descripcion { get; set; }
        public string nombrecliente { get; set; }
        public int idsucursalventa { get; set; }
        public int idpartner { get; set; }




    }
}
