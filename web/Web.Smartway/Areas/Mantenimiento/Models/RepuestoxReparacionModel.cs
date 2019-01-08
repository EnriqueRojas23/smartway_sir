
using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Web.Smartway.Areas.Mantenimiento.Models
{
    public class RepuestoxReparacionModel
    {
        public int? idrepuestoreparacion { get; set; }
        public int idrepuesto { get; set; }
        public int idreparacion { get; set; }

        public string descripcion { get; set; }
        public IEnumerable<SelectListItem> ListaRepuestos { get; set; }
        public string[] RepuestosSeleccionados { get; set; }
    }

}
