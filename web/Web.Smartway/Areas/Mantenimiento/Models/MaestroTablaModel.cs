using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Smartway.Areas.Mantenimiento.Models
{
    public class MaestroTablaModel
    {
        public int idmaestrotabla { get; set; }
        public string maestrotabla { get; set; }

    }
    public class ValorTablaModel
    {
        public int? idvalortabla { get; set; }
        public string valor { get; set; }
        public int idmaestrotabla { get; set; }
        public int orden { get; set; }
        public bool activo { get; set; }

    }
}