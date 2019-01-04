using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Smartway.Areas.Seguridad.Models.Paginas
{
    public class InsertarModificarPaginaModel
    {

        public long? pag_int_id { get; set; }
        public string pag_str_codmenu { get; set; }
        public string pag_str_codmenu_padre { get; set; }
        public string pag_str_descrip { get; set; }
        public string pag_str_nombre { get; set; }
        public int pag_int_nivel { get; set; }
        public int pag_int_secuencia { get; set; }
        public string pag_str_controller { get; set; }
        public string pag_str_action { get; set; }
        public string pag_str_attributes { get; set; }
        public string pag_str_tipomenu { get; set; }
        public string pag_str_url { get; set; }
        public bool pag_bit_activo { get; set; }
        public bool pag_bit_externo { get; set; }


    }
}