using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Web.Smartway.Areas.Seguridad.Models.Usuarios
{
    public class AsignarClientesModal
    {
        public int usuario { get; set; }
        public IEnumerable<SelectListItem> ListaClientes { get; set; }
        public string[] ClientesSeleccionados{ get; set; }
    }
}