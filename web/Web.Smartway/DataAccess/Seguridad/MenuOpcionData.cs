

using QueryContracts.Common.Seguridad.Parameters;
using QueryContracts.Common.Seguridad.Results;
using Seguridad.Common;
using System.Collections.Generic;
using ServiceAgents.Common;
using System.Linq;

namespace Web.Smartway.DataAccess.Seguridad
{
    public sealed class MenuOpcionData
    {
        public static List<MenuOpcion> GetListaTotalMenu(int prol_int_id)
        {
            var listamenu = GetListarMenu(prol_int_id);
            var resmenu = ObtenerItemsMenu(null, listamenu);
            return resmenu;

        }

        private static List<ListarMenusxRolesDto> GetListarMenu(int prol_int_id)
        {
            var parameter = new ListarMenusxRolesParameter() { rol_int_id = prol_int_id, sis_str_siglas = Constantes.GetModuleAcronym() };
            var result = (ListarMenusxRolesResult)parameter.Execute();
            return result == null ? new List<ListarMenusxRolesDto>() : result.Hits.ToList();
        }

        private static List<MenuOpcion> ObtenerItemsMenu(string codigopadre, List<ListarMenusxRolesDto> listamenu)
        {
            var listamenures = new List<MenuOpcion>();
            foreach (var menu in listamenu.Where(x => x.pag_str_codmenu_padre == codigopadre).ToList())
            {
                MenuOpcion mnu = new MenuOpcion();
                mnu.NombreMenu = menu.pag_str_nombre;
                mnu.Url = menu.pag_str_url;
                mnu.IdMenuOpcion = menu.pag_int_id;
                mnu.Nivel = menu.pag_int_nivel;
                mnu.CodigoMenu = menu.pag_str_codmenu;
                mnu.TipoMenu = menu.pag_str_tipomenu;
                mnu.MenuItem = ObtenerItemsMenu(menu.pag_str_codmenu, listamenu);
                mnu.ItemSeleccionado = menu.srp_seleccion == 0 ? false : true;
                mnu.CodigoPermiso = menu.srp_str_codpermiso;

                listamenures.Add(mnu);
            }
            return listamenures;
        }


    }

    ////public class MenuOpcion
    ////{
    ////    public int IdMenuOpcion { get; set; }
    ////    public string CodigoMenu { get; set; }
    ////    public string NombreMenu { get; set; }
    ////    public int Nivel { get; set; }
    ////    public string Url { get; set; }
    ////    public string TipoMenu { get; set; }
    ////    public bool ItemSeleccionado { get; set; }
    ////    public string CodigoPermiso { get; set; }

    ////    public IList<MenuOpcion> MenuItem { get; set;}
    ////}
}