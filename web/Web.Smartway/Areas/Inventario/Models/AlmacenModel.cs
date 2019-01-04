using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Smartway.Areas.Inventario.Models
{
    public class AlmacenModel
    {
        public int? idalmacen { get; set; }
        public string codigoalmacen { get; set; }
        public string nombrealmacen { get; set; }
        public int idsucursal { get; set; }
        public int idtipoalmacen { get; set; }
        public string tipoalmacen { get; set; }
        public string sucursal { get; set; }
        public bool activo { get; set; }
        public int __tipooperacion { get; set; }
    }
}