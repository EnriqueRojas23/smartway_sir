using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Coolbox.Models.Pedidos
{
    public class InsertarHojaRutaModal
    {

        public int IdMotorizado { get; set; }
        public string Numero { get; set; }
        public decimal TotalPedido { get; set; }
        public string Pedidos { get; set; }

    }
}