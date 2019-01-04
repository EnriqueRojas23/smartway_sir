
using QueryContracts.Common;
using System;
namespace QueryContracts.TYS.Facturacion.Parameters
{
    public class ObtenerNumeroComprobanteParameters : QueryParameter
    {
        public int idusuario { get; set; }
        public int idtipocomprobante { get; set; }
        public int? idestacionorigen { get; set; }
    }
}
