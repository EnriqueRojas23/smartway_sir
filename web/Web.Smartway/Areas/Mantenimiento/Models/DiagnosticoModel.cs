
using System.Collections.Generic;
using System.Web.Mvc;

namespace Web.Smartway.Areas.Mantenimiento.Models
{
    public class DiagnosticoModel
    {
        public int? iddiagnostico { get; set; }
        public string codigosmartway { get; set; }
        public string descripcion { get; set; }
        public int idtipoproducto { get; set; }
        public int idfabricante { get; set; }
        public int idtipodiagnostico { get; set; }
        public int idcategoriareparacion { get; set; }
        public string tipoproducto { get; set; }
        public string fabricante { get; set; }
        public string tipodiagnostico { get; set; }
        public string categoriareparacion { get; set; }
        public IEnumerable<SelectListItem> ListaTipoProductos { get; set; }
        public string[] TipoProductosSeleccionados { get; set; }
        public string tiposproducto { get; set; }
    }
    public class TipoDiagnosticoModel
    {
        public int idtipodiagnostico { get; set; }
        public string codigo { get; set; }
        public string descripcion { get; set; }
        public bool activo { get; set; }
    }
}
