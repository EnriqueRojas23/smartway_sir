

using CommandContracts.Common;
using System;

namespace CommandContracts.Smartway.Despacho
{
    public class InsertarActualizarGuiaRemisionDetalleCommand : Command
    {
        public long? idguiadetalle { get; set; }
        public string codigo { get; set; }
        public string descripcion { get; set; }
        public int cantidad { get; set; }
        public long idguiaremision { get; set; }
        public long idordenservicio { get; set; }

    }
}
