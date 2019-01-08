using System;

namespace Web.Smartway.Areas.Mantenimiento.Models
{
    public class FallaModel
    {
        public int? idfalla { get; set; }
        public string categoriafalla { get; set; }
        public string tipofalla { get; set; }
        public string tipoproducto { get; set; }
        public string fabricante { get; set; }
        public string codigosmartway { get; set; }
        public string descripcion { get; set; }
        public int idtipoproducto { get; set; }
        public int idfabricante { get; set; }
        public int idcategoriafalla { get; set; }
        public int idtipofalla { get; set; }
        public bool activo { get; set; }
        public DateTime fechahoraregistro { get; set; }
        public int idusuarioregistro { get; set; }
    }
    public class CategoriaFallaModel
    {
        public int idcategoriafalla { get; set; }
        public string codigo { get; set; }
        public string descripcion { get; set; }
        public bool activo { get; set; }

    }
    public class TipoFallaModel
    {
        public int idtipofalla { get; set; }
        public string codigo { get; set; }
        public string descripcion { get; set; }
        public bool activo { get; set; }

    }
}
