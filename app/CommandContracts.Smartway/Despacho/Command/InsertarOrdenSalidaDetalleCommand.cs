

using CommandContracts.Common;
using System;

namespace CommandContracts.Smartway.Despacho
{
    public class InsertarOrdenSalidaDetalleCommand : Command
    {
        public long? idordensalidadetalle { get; set; }
        public long idordensalida { get; set; }
        public int idproducto { get; set; }
        public int cantidad { get; set; }
        public string serie { get; set; }
        public string imei { get; set; }
        public string mac { get; set; }
        public DateTime fechahoraatencion { get; set; }
        public int idusuarioatencion { get; set; }
        public bool repuesto { get; set; }
    }
}
