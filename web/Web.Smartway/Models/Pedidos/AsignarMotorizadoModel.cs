using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Coolbox.Areas.Delivery.Models.Pedidos
{
    public class AsignarMotorizadoModel
    {
        public long ped_int_id { get; set; }

        public string tie_str_descrip { get; set; }

        public List<long> mot_int_id { get; set; }

        public string DescripcionEstado { get; set; }

        public string[] Controles { get; set; }

        public int ped_int_estado  { get; set; }

        public string DescripcionEmpresa { get; set; }

        public string DescripcionConductor{ get; set; }

        public string DescripcionPlaca   { get; set; }

    }
}