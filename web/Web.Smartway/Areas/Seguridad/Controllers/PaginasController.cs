using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.Common.Controllers;
using Web.Smartway.Areas.Seguridad.Models.Paginas;
using Web.Smartway.DataAccess;
using Web.Common.Extensions;
using QueryContracts.Smartway.Seguridad.Result;
using System.Collections;

namespace Web.Smartway.Areas.Seguridad.Controllers
{
    public class PaginasController : BaseController
    {
        public ActionResult Index()
        {

            return RedirectToAction("ListarPaginas", "Paginas", new { area = "seguridad" });

        }
        public ActionResult ListarPaginas()
        {
            var modelo = new ListarPaginasModel();



            return View(modelo);

        }
        [HttpPost]
        public ActionResult ListarPaginas(ListarPaginasModel modelo)
        {
            if (!string.IsNullOrEmpty(modelo.SearchDefault))
            {

                modelo.nombre = string.Empty;

                //analizando el filtro principal.
                if (!modelo.SearchDefault.IsFormatSearch())
                {
                    modelo.nombre = modelo.SearchDefault;
                    modelo.SearchDefault = "{" + Constantes.Seguridad.Usuario.listadopedido_filtro_nombrecompleto + ":" + modelo.nombre + "}";
                }
                else
                {
                    var res = modelo.SearchDefault.FormatSearch();
                    modelo.nombre = res.GetOrDefault(Constantes.Seguridad.Usuario.listadopedido_filtro_nombrecompleto);
                }
            }
            return View(modelo);
        }
        public JsonResult JsonListarPaginas(string nom)
        {
            var listadoTotal = DataAccess.Seguridad.PaginaData.BuscarPaginas(nom);
            var resjson1 = (new JqGridExtension<BuscarPaginasDto>()).DataBind(listadoTotal, listadoTotal.Count);
            return resjson1;

        }
        public PartialViewResult InsertarPaginaModal()
        {

            var sistemas = DataAccess.Seguridad.PaginaData.ListarPaginasPadre();
            var listasistemas = new SelectList(
                sistemas,
                "pag_str_codmenu",
                "pag_str_nombre");

            //List<SelectListItem> or = new List<SelectListItem>();
            //for (int i = 1; i <= cant; i++)
            //{
            //    or.Add(new SelectListItem() { Text = i.ToString(), Value = i.ToString() });

            //}
            //var ordenes = new SelectList(or, "Text", "Value");
            //ViewData["ordenes"] = ordenes;

            ViewData["listasistemas"] = listasistemas;

            return PartialView("_InsertarPaginaModal");
        }
        public ActionResult InsertarModificarPaginaModal1(InsertarModificarPaginaModel model)
        {
            model.pag_int_nivel = 2;
            
            //if(model.pag_int_secuencia == 0) model.pag_int_secuencia 
            model.pag_str_tipomenu = "I";

            var res = DataAccess.Seguridad.PaginaData.InsertarPagina(this.ControllerContext, model);
            var modelo = new ListarPaginasModel();
            if (res == 0)
            {
                return Json(new { success = false }, JsonRequestBehavior.AllowGet); 
            }
            else
            {
                return Json(new { res = "1" });
            }
        }
        public ActionResult EliminarPagina(int id)
        {
            var resp = DataAccess.Seguridad.PaginaData.EliminarPagina(id);
            if (resp == "OK")
            {
                return Json(new { res = true , success = true }, JsonRequestBehavior.AllowGet);
            }
            else
            {   
                return Json(new { success = true, res = false }, JsonRequestBehavior.AllowGet);
            }
 

        }
        public PartialViewResult EditarPaginaModal(int id)
        {
            int cant = 0;

             var opagina = DataAccess.Seguridad.PaginaData.ObtenerPagina(id);
             var model = new InsertarModificarPaginaModel();
             model.pag_int_id = id;
             model.pag_int_secuencia = opagina.pag_int_secuencia;
             model.pag_str_action = opagina.pag_str_action;
             model.pag_str_attributes = opagina.pag_str_attributes;
             model.pag_str_codmenu = opagina.pag_str_codmenu;
             model.pag_str_codmenu_padre = opagina.pag_str_codmenu_padre;
             model.pag_str_controller = opagina.pag_str_controller;
             model.pag_str_nombre = opagina.pag_str_nombre;
             model.pag_str_url = opagina.pag_str_url;
             model.pag_bit_activo = opagina.pag_bit_activo;
             model.pag_bit_externo = opagina.pag_bit_externo;
             cant = opagina.cantidad;

             List<SelectListItem> or = new List<SelectListItem>();
            for (int i = 1; i <= cant; i++)
			{
                or.Add(new SelectListItem() { Text = i.ToString(), Value = i.ToString() });
             
			}
            var ordenes = new SelectList(or,"Text","Value");
            ViewData["ordenes"] = ordenes;

            var sistemas = DataAccess.Seguridad.PaginaData.ListarPaginasPadre();
            var listasistemas = new SelectList(
                sistemas,
                "pag_str_codmenu",
                "pag_str_nombre");

            ViewData["listasistemas"] = listasistemas;

            return PartialView("_ModificarPaginaModal", model);

        }

    }
}
