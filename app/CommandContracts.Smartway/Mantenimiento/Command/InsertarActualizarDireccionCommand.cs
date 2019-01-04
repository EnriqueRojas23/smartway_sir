

using CommandContracts.Common;
namespace CommandContracts.Smartway.Mantenimiento
{
    public class InsertarActualizarDireccionCommand : Command
    {
        public int? iddireccion { get; set; }
        public string codigo { get; set; }
        public string direccion { get; set; }
        public int iddistrito { get; set; }
        public bool principal { get; set; }
        public int? idcliente { get; set; }
        public bool activo { get; set; }
        public int __tipooperacion { get; set; }

    }
}
