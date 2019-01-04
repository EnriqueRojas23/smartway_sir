
using QueryContracts.Common;
using System;
namespace QueryContracts.Smartway.Facturacion.Parameters
{
    public class ListarComprobantesParameters : QueryParameter
    {
        public int? idestado { get; set; }
        public string numerocomprobante { get; set; }
        public int? idcliente { get; set; }
        public int? idtipocomprobante { get; set; }

    }
}
