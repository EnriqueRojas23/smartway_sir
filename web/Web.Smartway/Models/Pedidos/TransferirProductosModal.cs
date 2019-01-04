using CommandContracts.Coolbox.Pedidos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Coolbox.Areas.Delivery.Models.Pedidos
{
    public class TransferirProductosModal : ProductoTransferidoCommand
    {
        public string CodigoProducto { get; set; }
        public string DescripcionProducto { get; set; }
        public int CantTransferir { get; set; }
        public string TiendaOrigen { get; set; }
        public int StockOrigen { get; set; }
        public string TiendaDestino { get; set; }
        public string NumeroPedido { get; set; }
        public string Identificador 
        {
            get { return string.Format("{0}_{1}_{2}_{3}", ped_int_id, pro_int_id, tie_int_origen, tie_int_destino); }
        }

    }
}