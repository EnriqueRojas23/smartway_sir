
using System;

namespace Web.Smartway.Areas.Mantenimiento.Models
{
    public class ReparacionModel
    {
        public int? idreparacion { get; set; }
        public string codigosmartway { get; set; }
        public string descripcion { get; set; }
        public int idtipoproducto { get; set; }
        public int idfabricante { get; set; }
        public int idcategoriareparacion { get; set; }
        public int idtiporeparacion { get; set; }
        public int idnivelreparacion { get; set; }
        public bool activo { get; set; }
        public DateTime fechahoraregistro { get; set; }
        public int idusuarioregistro { get; set; }
        public string categoriareparacion { get; set; }
        public string tiporeparacion { get; set; }
        public string nivelreparacion { get; set; }
        public string nivelreparacionPOS { get; set; }
        public string nivelreparacionTELECOM { get; set; }
        public string fabricante { get; set; }
        public string tipoproducto { get; set; }
    }
    public class CategoriaReparacionModel
    {
        public int idcategoriareparacion { get; set; }
        public string codigo { get; set; }
        public string descripcion { get; set; }
        public bool activo { get; set; }
    }
    public class TipoReparacionModel
    {
        public int idtiporeparacion { get; set; }
        public string codigo { get; set; }
        public string descripcion { get; set; }
        public bool activo { get; set; }

    }
}
