

using CommandContracts.Common;
using System;

namespace CommandContracts.Smartway.Mantenimiento
{
    public class InsertarActualizarDiagnosticoxTipoProductoCommand : Command
    {
        public int? iddiagnosticotipoproducto { get; set; }
        public int iddiagnosticosmartway { get; set; }
        public int idtipoproducto { get; set; }

    }
}
