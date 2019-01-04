using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Web.Common.Extensions;

namespace Web.Smartway.Areas.Seguridad.Models.Paginas
{
    public class ListarPaginasModel : ParameterGridDefault
    {
        public ListarPaginasModel() { }
        public string SearchDefault { get; set; }
        public int idpagina { get; set; }
        [Display(Name = "Nombre:")]
        public string nombre { get; set; }
        public string padre { get; set; }
        public string codmenu { get; set; }
        public string tipomenu { get; set; }
        public int nivel { get; set; }
        public int secuencia { get; set; }
        public string controller { get; set; }
        public string action { get; set; }
        public string attributes { get; set; }

     

    }
}