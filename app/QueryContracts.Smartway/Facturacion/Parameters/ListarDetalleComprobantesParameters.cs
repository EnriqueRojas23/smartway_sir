
using QueryContracts.Common;
using System;
namespace QueryContracts.Smartway.Facturacion.Parameters
{
    public class ListarDetalleComprobantesParameters : QueryParameter
    {
       
        public long? iddocumentocompra { get; set; }
        public string serie { get; set; }

    }
}
