using System.Web.Mvc;
using CommandContracts.Common;
using QueryContracts.Common;
using StructureMap.Pipeline;
using Web.Common.ActionResults;
using Seguridad.Common;
using SessionWrapper = Seguridad.Common.SessionWrapper;
using log4net;
using System.Reflection;
using System;
using QueryContracts.Common.Seguridad.Results;
using System.Collections.Generic;
using System.Linq;
using System.Configuration;
using System.Web.Routing;
using QueryContracts.Common.Seguridad.Parameters;
using ServiceAgents.Common;


namespace Web.Common.Controllers
{
    public class BaseController : Controller
    {

        private static ILog Log = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
        public BaseController()
        {

            //var ctx = HttpContext.Current;

            // if (ctx.Session != null)
            // {

            //     if (ctx.Session.IsNewSession || ctx.Session["dbUser"] == null)
            //     { }
            // }
        }

        #region Metodos de Log

        public void Error(string error)
        {
            Error(new Exception(error));
        }

        public void Error(Exception ex)
        {
            Log.Error(ex.Message, ex);
            ex = Unwrap(ex);
            Log.Error(ex.Message, ex);
        }

        private static Exception Unwrap(Exception ex)
        {
            while (null != ex.InnerException)
            {
                ex = ex.InnerException;
            }

            return ex;
        }

        #endregion


        public CommandActionResult Command(Command command)
        {
            return new CommandActionResult(command);
        }

        public CommandActionResult Command(Command command, string urlResultRedirect)
        {
            return new CommandActionResult(command, urlResultRedirect);
        }

        public Transaccion ExecuteCommand(ControllerContext context, Command command)
        {
            return new CommandActionResult(command).ExecuteCommand(context);
        }

        public QueryViewResult<T> Query<T>(QueryParameter parameter) where T : class
        {
            return new QueryViewResult<T>(parameter);
        }

        private List<ListarMenusxRolesDto> GetListarMenu(int? prol_int_id)
        {
            var parameter = new ListarMenusxRolesParameter() { rol_int_id = prol_int_id, sis_str_siglas = GetModuleAcronym() };
            var result = (ListarMenusxRolesResult)parameter.Execute();
            return result == null ? new List<ListarMenusxRolesDto>() : result.Hits.Where(x => x.srp_seleccion == 1).ToList();
        }

        public Perfil Perfil
        {
            get
            {
                if (SessionWrapper.Perfil != null && (SessionWrapper.Perfil.ListaMenuOpcion == null || SessionWrapper.Perfil.ListaMenuOpcion.Any() == false))
                {
                    SessionWrapper.Perfil.ListaMenuOpcion = GetMenuOpcionBd(SessionWrapper.Perfil.IdPerfil);
                }
                return SessionWrapper.Perfil;
            }
        }

        private List<MenuOpcion> GetMenuOpcionBd(int? idperfil)
        {
            var listamenu = GetListarMenu(idperfil);
            var resmenu = ObtenerItemsMenu(null, listamenu);
            return resmenu;

        }

        private static List<MenuOpcion> ObtenerItemsMenu(string codigopadre, IEnumerable<ListarMenusxRolesDto> listamenu)
        {
            //var listarMenusxRolesDtos = listamenu as IList<ListarMenusxRolesDto> ?? listamenu.ToList();
            //return listarMenusxRolesDtos.Where(x => x.pag_str_codmenu_padre == codigopadre).ToList().Select(menu => new MenuOpcion
            //{
            //    NombreMenu = menu.pag_str_nombre, 
            //    Url = menu.pag_str_url, 
            //    IdMenuOpcion = menu.pag_int_id, 
            //    Nivel = menu.pag_int_nivel, 
            //    CodigoMenu = menu.pag_str_codmenu, 
            //    TipoMenu = menu.pag_str_tipomenu, 
            //    MenuItem = ObtenerItemsMenu(menu.pag_str_codmenu, listarMenusxRolesDtos), 
            //    ItemSeleccionado = menu.srp_seleccion != 0, 
            //    CodigoPermiso = menu.srp_str_codpermiso, 
            //    ControllerName = menu.pag_str_controller, 
            //    ActionName = menu.pag_str_action, 
            //    AttributesRoute = menu.pag_str_attributes, 
            //    Secuencia = menu.pag_int_secuencia
            //}).ToList();
            var listamenures = new List<MenuOpcion>();
            foreach (var menu in listamenu.Where(x => x.pag_str_codmenu_padre == codigopadre).ToList())
            {
                MenuOpcion mnu = new MenuOpcion();
                mnu.NombreMenu = menu.pag_str_nombre;
                mnu.IconoMenu = menu.pag_str_icono;
                mnu.Url = menu.pag_str_url;
                mnu.IdMenuOpcion = menu.pag_int_id;
                mnu.Nivel = menu.pag_int_nivel;
                mnu.CodigoMenu = menu.pag_str_codmenu;
                mnu.TipoMenu = menu.pag_str_tipomenu;
                mnu.MenuItem = ObtenerItemsMenu(menu.pag_str_codmenu, listamenu);
                mnu.ItemSeleccionado = menu.srp_seleccion == 0 ? false : true;
                mnu.CodigoPermiso = menu.srp_str_codpermiso;
                mnu.ControllerName = menu.pag_str_controller;
                mnu.ActionName = menu.pag_str_action;
                mnu.AttributesRoute = menu.pag_str_attributes;
                mnu.Secuencia = menu.pag_int_secuencia;


                listamenures.Add(mnu);
            }
            return listamenures;
        }

        public Usuario Usuario
        {
            get
            { 
                return SessionWrapper.Usuario; 
            }
        }

        public string GetModuleAcronym()
        {
            if (ConfigurationManager.AppSettings["ModuleAcronym"] == null) throw new ArgumentException("No esta configurado el ModuleAcronym en el archivo de configuración.");
            var res = Convert.ToString(ConfigurationManager.AppSettings["ModuleAcronym"]);
            return res;
        }

        public JsonResult UrlAction(string action, string controller, string area = null)
        {
            var routevalue = new RouteValueDictionary { { "area", area } };
            var url = Url.Action(action, controller, routevalue);
            return Json(new { urlres = url });
        }


             


    }
}
