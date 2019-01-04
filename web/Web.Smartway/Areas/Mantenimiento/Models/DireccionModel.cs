using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Smartway.Areas.Mantenimiento.Models
{

    public class DireccionModel
    {
        public int? iddireccion { get; set; }
        public string codigo { get; set; }
        public string direccion { get; set; }
        public int iddistrito { get; set; }
        public bool principal { get; set; }
        public int? idcliente { get; set; }
        public bool activo { get; set; }
        public string cliente { get; set; }

        public int __tipooperacion { get; set; }
    }

}
