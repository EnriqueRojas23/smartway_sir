using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Smartway.Areas.Mantenimiento.Models
{
    public class ZonaModel
    {
        public int? idzona { get; set; }
        public string nombre { get; set; }
        public int iddepartamento { get; set; }
        public string criterio { get; set; }
        public string distritos { get; set; }
        public bool activo { get; set; }
    }
}