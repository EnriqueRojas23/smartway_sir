

using CommandContracts.Common;
namespace CommandContracts.Smartway.Mantenimiento
{
    public class InsertarActualizarClienteCommand : Command
    {
        public int? idcliente { get; set; }
        public string nombre { get; set; }
        public int idtipodocumento { get; set; }
        public string numerodocumento { get; set; }
        public string contacto { get; set; }
        public string telefono { get; set; }
        public bool activo { get; set; }
        public string celular { get; set; }
        public string email { get; set; }
        public int? idsexo { get; set; }
        public int __tipooperacion { get; set; }




    }
}
