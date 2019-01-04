
using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Web.Smartway.Areas.Mantenimiento.Models
{
    public class ProductoxRepuestoModel
    {
        public int? idrepuestoxproducto { get; set; }
        public int idrepuesto { get; set; }
        public int idproducto { get; set; }

        public IEnumerable<SelectListItem> ListaRepuestos { get; set; }
        public string[] RepuestosSeleccionados { get; set; }
    }
}
