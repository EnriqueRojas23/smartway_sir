

using CommandContracts.Common;

namespace CommandContracts.Smartway.Mantenimiento
{
    public class InsertarActualizarRepuestoxReparacionCommand : Command
    {
        public int? idrepuestoreparacion { get; set; }
        public int idrepuesto { get; set; }
        public int idreparacion { get; set; }

    }
}
