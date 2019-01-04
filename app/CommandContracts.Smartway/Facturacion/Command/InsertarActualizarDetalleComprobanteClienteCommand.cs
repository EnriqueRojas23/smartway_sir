

using CommandContracts.Common;
using System;

namespace CommandContracts.Smartway.Facturacion
{
    public class InsertarActualizarDetalleComprobanteClienteCommand : Command
    {
        public long? iddetallecomprobantecliente { get; set; }
        public int iddocumentocompra { get; set; }
        public int idproducto { get; set; }
        public string serie { get; set; }
        public string imei { get; set; }
        public string mac { get; set; }
        public int cantidad { get; set; }
        public decimal subtotal { get; set; }
        public decimal descuento { get; set; }
        public decimal igv { get; set; }
        public decimal total { get; set; }

    }
}
