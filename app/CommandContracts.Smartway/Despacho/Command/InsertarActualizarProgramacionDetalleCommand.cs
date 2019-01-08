

using CommandContracts.Common;
using System;

namespace CommandContracts.Smartway.Despacho
{
    public class InsertarActualizarProgramacionDetalleCommand : Command
    {
        public int? idprogramaciondetalle { get; set; }
        public int idprogramacion { get; set; }    
        public int idguia { get; set; }

    }
}
