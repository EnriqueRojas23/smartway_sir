using System.Collections.Generic;
using System.Web;
namespace Seguridad.Common
{

    public class Perfil : IPerfil
    {
        const string InfoMenu = "SessionWrapperMenu";

        public int? IdPerfil { get; set; }

        public string NombrePerfil { get; set; }

        public List<MenuOpcion> ListaMenuOpcion
        {
            get
            {
                if (null != HttpContext.Current.Session[InfoMenu])
                    return HttpContext.Current.Session[InfoMenu] as List<MenuOpcion>;
                return null;
            }
            set
            {
                HttpContext.Current.Session[InfoMenu] = value;
            }
        }


        

       


    }
}
