

using CommandContracts.Common;
using System;

namespace CommandContracts.Smartway.Despacho
{
    public class InsertarOrdenSalidaCommand : Command
    {
        public long? iddocumentosalida { get; set; }
        public string numerodocumento { get; set; }
        public int idcliente { get; set; }
        public int idtiposalida { get; set; }
        public bool activo { get; set; }
        public DateTime fechahoraregistro { get; set; }
        public DateTime fechasalida { get; set; }
        public string lote { get; set; }
        public int idusuarioregistro { get; set; }

    }
}
