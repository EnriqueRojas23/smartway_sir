

using CommandContracts.Common;
namespace CommandContracts.Smartway.Mantenimiento
{
    public class InsertarActualizarZonaCommand : Command
    {
        public int? idzona { get; set; }
        public string nombre { get; set; }
        public bool activo { get; set; }

    }
}
