

using QueryContracts.Common;
using System;
using System.Collections.Generic;
    
namespace QueryContracts.TYS.Facturacion.Results
{
    public class ObtenerNumeroComprobanteResult : QueryResult
    {
        public int idnumerodocumento { get; set; }
        public string serie { get; set; }
        public string primernumero { get; set; }
        public string ultimonumero { get; set; }

    }
}
