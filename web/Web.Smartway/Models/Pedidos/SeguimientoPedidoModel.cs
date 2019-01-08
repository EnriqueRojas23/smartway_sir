using CommandContracts.Coolbox.Pedidos;
namespace Web.Coolbox.Areas.Delivery.Models.Pedidos
{
    public class SeguimientoPedidoModel : SeguimientoPedidoCommand
    {
        public string NroPedido { get; set; }
        public string DescripcionEstado { get; set; }
        public string Verificado { get; set; }
        public string seg_str_comentario { get; set; }
        public string[] Controles { get; set; }
    }
}