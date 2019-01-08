using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Web.Smartway.Areas.Seguridad.Models.Sistemas
{
    public class InsertarModificarSistemaModel
    {
        public int? pag_int_id { get; set; }
        public string pag_str_codmenu { get; set; }
        public string pag_str_nombre { get; set; }
        public string pag_str_descrip { get; set; }
        public string pag_str_url { get; set; }
        public int pag_bit_orden { get; set; }
        public bool pag_bit_activo { get; set; }

    }
}