

using System.Collections.Generic;
namespace Seguridad.Common
{
    public class MenuOpcion
    {
        public int IdMenuOpcion { get; set; }
        public string CodigoMenu { get; set; }
        public string NombreMenu { get; set; }
        public string IconoMenu { get; set; }
        public int Nivel { get; set; }
        public string Url { get; set; }
        public string TipoMenu { get; set; }
        public bool ItemSeleccionado { get; set; }
        public string CodigoPermiso { get; set; }
        public int Secuencia { get; set; }
        public string ControllerName { get; set; }
        public string ActionName { get; set; }
        public string AttributesRoute { get; set; }
        public IList<MenuOpcion> MenuItem { get; set; }
    }
}
