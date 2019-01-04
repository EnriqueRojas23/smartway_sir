

using CommandContracts.Common;
using System;

namespace CommandContracts.Smartway.Reparacion
{
    public class InsertarActualizarDocumentoRecepcionDetalleCommand : Command
    {
        public long? iddocumentorecepciondetalle { get; set; }
        public long iddocumentorecepcion { get; set; }
        public string numeropallet { get; set; }
        public string caja { get; set; }
        public bool repuesto { get; set; }
        public int idtipoproducto { get; set; }
        public int fila { get; set; }
        public int idproducto { get; set; }
        public string serie { get; set; }
        public string imei { get; set; }
        public int idmodelo { get; set; }
        public string mac { get; set; }
        public int cantidad { get; set; }
        public DateTime fechahorapersonalizacion { get; set; }
        public int idusuariopersonalizacion { get; set; }
    }
}
