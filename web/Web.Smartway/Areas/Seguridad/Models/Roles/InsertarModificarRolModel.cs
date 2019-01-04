using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Smartway.Areas.Seguridad.Models.Roles
{
    public class InsertarModificarRolModel
    {
        public int? rol_int_id {get;set;}
        public string rol_str_descrip {get;set;}
        public string rol_str_alias {get;set;}
        public string rol_str_usuario {get;set;}
        public string rol_str_pass {get;set;}
        public bool rol_bit_publicopublic { get; set; }
        public bool rol_bit_activo { get; set; }
        
    }
}