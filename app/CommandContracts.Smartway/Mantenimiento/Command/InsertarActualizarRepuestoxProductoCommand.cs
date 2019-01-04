

using CommandContracts.Common;

namespace CommandContracts.Smartway.Mantenimiento
{
    public class InsertarActualizarRepuestoxProductoCommand : Command
    {
        public int? idrepuestoxproducto { get; set; }
        public int idrepuesto { get; set; }
        public int idproducto { get; set; }

    }
}
