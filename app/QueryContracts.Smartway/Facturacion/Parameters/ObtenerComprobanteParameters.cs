using QueryContracts.Common;

namespace QueryContracts.Smartway.Facturacion.Parameters
{
    public class ObtenerComprobanteParameters : QueryParameter
    {
        public long? idcomprobante { get; set; }
        public string numerocomprobante { get; set; }

    }
}
