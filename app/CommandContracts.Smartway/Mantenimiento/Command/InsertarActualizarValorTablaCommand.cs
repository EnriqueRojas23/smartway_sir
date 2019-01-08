

using CommandContracts.Common;
namespace CommandContracts.Smartway.Mantenimiento
{
    public class InsertarActualizarValorTablaCommand : Command
    {
        public int? idvalortabla { get; set; }
        public string valor { get; set; }
        public int idmaestrotabla { get; set; }
        public bool activo { get; set; }
        public int orden { get; set; }

    }
}
