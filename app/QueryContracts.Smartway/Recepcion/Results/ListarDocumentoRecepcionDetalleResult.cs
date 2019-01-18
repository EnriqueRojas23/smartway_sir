

using QueryContracts.Common;
using System;
using System.Collections.Generic;
    
namespace QueryContracts.Smartway.Recepcion.Results
{
    public class ListarDocumentoRecepcionDetalleResult : QueryResult
    {
        public IEnumerable<ListarDocumentoRecepcionDetalleDto> Hits { get; set; }
    }
    public class ListarDocumentoRecepcionDetalleDto
    {
        public string codigoproducto { get; set; }
        public string descripcionlarga { get; set; }
        public string serie { get; set; }
        public string imei { get; set; }
        public string mac { get; set; }
        public int cantidad { get; set; }
        public string numeropallet { get; set; }
        public string caja { get; set; }
        public int fila { get; set; }
        public string modelo { get; set; }
        public string Tipo { get; set; }



    }
}
