using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Smartway.Areas.Mantenimiento.Models
{

    public class TarifaModel
    {
        public int? idtarifa { get; set; }
        public int idpartner { get; set; }
        public int idcopiapartner { get; set; }
        public int idmoneda { get; set; }
        public string moneda { get; set; }
        public decimal? costo { get; set; }
        public decimal? diagnostico { get; set; }
        public decimal? revision { get; set; }
        public int idtipoproducto { get; set; }
        public int idtipotarifa { get; set; }
        public string tipotarifa { get; set; }
        public string tipoproducto { get; set; }
        public int idnivelreparacion { get; set; }
        public bool garantia { get; set;     }
        public int idusuarioregistro { get; set; }
        public DateTime fechahoraregistro { get; set; }
        public string nivelreparacion { get; set; }
        public bool activo { get; set; }
    }

}
