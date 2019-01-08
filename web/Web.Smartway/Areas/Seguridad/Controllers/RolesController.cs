using System;
using AutoMapper;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.Common.Controllers;
using Web.Common.HtmlHelpers;
using Web.Smartway.Areas.Seguridad.Models.Roles;
using Web.Smartway.DataAccess;
using Web.Smartway.DataAccess.Seguridad;
using Web.Common.Extensions;
using QueryContracts.Smartway.Seguridad.Result;
using Componentes.Common.Utilidades;
using Seguridad.Common;
using System.Configuration;

namespace Web.Smartway.Areas.Seguridad.Controllers
{
    public class RolesController : BaseController
    {
        #region Listar Roles 
        public ActionResult Index()
        {
            return RedirectToAction("ListarRoles", "Roles", new { area = "seguridad" });
        }
        public ActionResult ListarRoles()
        {
            var modelo = new ListarRolesModel();
            return View(modelo);
        }

        [HttpPost]
        public ActionResult ListarRoles(ListarRolesModel modelo)
        {
            if (!string.IsNullOrEmpty(modelo.SearchDefault))
            {
                modelo.NombreRol = string.Empty;

                //analizando el filtro principal.
                if (!modelo.SearchDefault.IsFormatSearch())
                {
                    modelo.NombreRol = modelo.SearchDefault;
                    modelo.SearchDefault = "{" + Constantes.Seguridad.Rol.listadorol_filtro_nombrerol + ":" + modelo.NombreRol + "}";
                }
                else
                {
                    var res = modelo.SearchDefault.FormatSearch();
                    modelo.NombreRol = res.GetOrDefault(Constantes.Seguridad.Rol.listadorol_filtro_nombrerol);
                    
                }
            }
            return View(modelo);
        }

        public JsonResult JsonListarRoles(string nom)
        {
            var listadoTotal = RolesData.ListarRoles(nom);
            var resjson1 = (new JqGridExtension<ListarRolesDto>()).DataBind(listadoTotal, listadoTotal.Count);
            return resjson1;

        }

        #endregion 
        //[HttpPost]
        public ActionResult AsignarMenuOpcion(int id)
        {
            //if (string.IsNullOrEmpty(id))
            //{
            //    this.Error(new ArgumentNullException("No se ha ingresado el id del rol"));
            //  //  return RedirectToAction("ListarRoles", "Rol");
            //}
            //if (!Utilidades.IsNumeric(id))
            //{
            //    this.Error(new InvalidCastException("El id ingresado no cumple el formato numerico requerido"));
            //    //return RedirectToAction("ListarRoles", "Rol");
            //}
            var resRol = RolesData.ObtenerDatosRol(id);
         //   if (resRol == null) return RedirectToAction("ListarRoles", "Roles");

            var modelo = new AsignarMenuOpcionModel();
            modelo.ListaOpciones = MenuOpcionData.GetListaTotalMenu(id);
            modelo.rol_int_id = resRol.rol_int_id;
            modelo.rol_str_descrip = resRol.rol_str_descrip;

            //return Json(new { success = true, cod =modelo.sis_str_sigla, des = modelo.rol_str_descrip }, JsonRequestBehavior.AllowGet);
            //  if (roles_procesados > 0)
             // return RedirectToAction("AsignarMenuOpcion", "Roles", new { area = "seguridad", id = modelo.rol_int_id });
            return View(modelo);
        }

        //[HttpPost]
        //public ActionResult AsignarMenuOpcion(AsignarMenuOpcionModel modelo, FormCollection formcollection)
        //{
        //    var sis_str_siglas = ConfigurationManager.AppSettings["ModuleAcronym"] == null ? string.Empty : Convert.ToString(ConfigurationManager.AppSettings["ModuleAcronym"]);
           
        //    if(formcollection["trevalor"] == null) throw new ArgumentException("Hubo un error al momento de obtener los datos ");
        //    var datos_array = Convert.ToString(formcollection["trevalor"]).Split(',');
        //    modelo.ListaOpciones = new List<MenuOpcion>();
        //    foreach (var datos in datos_array)
        //    {
        //        modelo.ListaOpciones.Add(new MenuOpcion() {
        //            IdMenuOpcion = int.Parse(GetDataFormatString("data-idmenu", datos)),
        //            CodigoPermiso = GetDataFormatString("data-permiso", datos),
        //            ItemSeleccionado = bool.Parse(GetDataFormatString("data-selectoption", datos))
        //        });
        //    }

        //    var roles_procesados = RolesData.AsignarMenuOpcionRol(this.ControllerContext, sis_str_siglas, modelo.rol_int_id, modelo.ListaOpciones.Where(x=>x.ItemSeleccionado == true).ToList());
        //    if (roles_procesados == 0) { ViewBag.Mensaje = "Se han activo todas las opciones para este rol"; }
        //    else { ViewBag.Mensaje = string.Format("se han asignado {0} opciones al rol", roles_procesados); }

        //    if (roles_procesados > 0)
        //        return RedirectToAction("AsignarMenuOpcion", "Roles", new { area = "seguridad", id = modelo.rol_int_id });

        //    return View(modelo);
        //}
        [HttpPost]
        public ActionResult AsignarMenuOpcion2(string ids, int rol)
        {
            var sis_str_siglas = ConfigurationManager.AppSettings["ModuleAcronym"] == null ? string.Empty : Convert.ToString(ConfigurationManager.AppSettings["ModuleAcronym"]);

            //if (formcollection["trevalor"] == null) throw new ArgumentException("Hubo un error al momento de obtener los datos ");
            //var datos_array = Convert.ToString(formcollection["trevalor"]).Split(',');
            //modelo.ListaOpciones = new List<MenuOpcion>();
            string ids_extras = ",";
            string[] datos_array_first = ids.Split(',');
            foreach (var item in datos_array_first)
            {
                string idpadre = RolesData.GetObtenerIdPadre(Convert.ToInt32(item)).ToString();
                if (ids.IndexOf(idpadre) != -1) continue;
                if (Convert.ToInt32(idpadre) == 0) continue;
                if (ids_extras.IndexOf(idpadre) == -1)
               ids_extras = ids_extras + ","+   idpadre;

            }


            var modelo = new AsignarMenuOpcionModel();
            modelo.rol_int_id = rol;
            modelo.ListaOpciones = new List<MenuOpcion>();
            ids = ids + ids_extras;


            string[] datos_array = ids.Split(',');
            
            foreach (var datos in datos_array)
            {
                if (datos == "") continue;
                modelo.ListaOpciones.Add(new MenuOpcion()
                {
                    IdMenuOpcion =  int.Parse(datos), //int.Parse(GetDataFormatString("data-idmenu", datos)),
                    CodigoPermiso  = "AME" , // GetDataFormatString("data-permiso", datos),
                    ItemSeleccionado = true //bool.Parse(GetDataFormatString("data-selectoption", datos))
                });
            }
            
            var roles_procesados = RolesData.AsignarMenuOpcionRol(this.ControllerContext, sis_str_siglas, modelo.rol_int_id, modelo.ListaOpciones.Where(x => x.ItemSeleccionado == true).ToList());
            if (roles_procesados == 0) { ViewBag.Mensaje = "Se han activo todas las opciones para este rol"; }
            else { ViewBag.Mensaje = string.Format("se han asignado {0} opciones al rol", roles_procesados); }

            if (roles_procesados > 0)
                //return RedirectToAction("AsignarMenuOpcion", "Roles", new { area = "seguridad", id = modelo.rol_int_id });
                return Json(new { success = true , res = "1"}, JsonRequestBehavior.AllowGet);
            else return Json(new { success = false, res = "0" }, JsonRequestBehavior.AllowGet); 
            //return View(modelo);
        }


        private string GetDataFormatString(string key, string data)
        {
            var data_array = data.Split('|');
            for(var i= 0; i<= data_array.Length; i++) {
                if(data_array[i].Contains(key)) {
                    return data_array[i].Split(':')[1];
                }
            }
            return string.Empty;
        }

        public PartialViewResult InsertarRol()
        {
            return PartialView("_InsertarModificarRol");
        }

        public ActionResult Insertar(InsertarModificarRolModel model)
        {
            var result = DataAccess.Seguridad.RolesData.InsertarModificarRol(model);
            if(result.rol_int_id > 0)
            return Json(new { res = true }, JsonRequestBehavior.AllowGet);
            else
             return Json(new { res = false }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Eliminar(int id)
        {
            var result = DataAccess.Seguridad.RolesData.EliminarRol(id);
            return Json(new { res = true }, JsonRequestBehavior.AllowGet);
 
        }

        public ActionResult EditarRol(int id)
        {
            var oRol =  DataAccess.Seguridad.RolesData.ObtenerDatosRol(id);
            var model = new InsertarModificarRolModel();
            model.rol_str_descrip = oRol.rol_str_descrip;
            model.rol_str_alias = oRol.rol_str_alias;
            model.rol_str_usuario = oRol.rol_str_usuario;
            model.rol_int_id = oRol.rol_int_id;
            model.rol_bit_activo = oRol.rol_bit_activo;

            return PartialView("_ModificarRol", model);
        }




    }
}
