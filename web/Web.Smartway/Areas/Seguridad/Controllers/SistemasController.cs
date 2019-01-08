
using QueryContracts.Smartway.Seguridad.Result;
using System;
using System.Web.Mvc;
using Web.Common.Controllers;
using Web.Common.Extensions;
using Web.Smartway.Areas.Seguridad.Models.Paginas;
using Web.Smartway.Areas.Seguridad.Models.Sistemas;
using Web.Smartway.DataAccess;
using Web.Smartway.DataAccess.Seguridad;
namespace Web.Smartway.Areas.Seguridad.Controllers
{
    public class SistemasController : BaseController
    {
        public ActionResult Index()
        {
          return RedirectToAction("ListarSistemas", "Sistemas", new { area = "seguridad" });
        }

        public ActionResult ListarSistemas()
        {
            var modelo = new ListarSistemasModel();
            return View(modelo);
        }
        [HttpPost]
        public ActionResult ListarSistemas(ListarSistemasModel modelo)
        {
            if (!string.IsNullOrEmpty(modelo.SearchDefault))
            {
                modelo.Alias = string.Empty;
                modelo.NombreCompleto = string.Empty;

                //analizando el filtro principal.
                if (!modelo.SearchDefault.IsFormatSearch())
                {
                    modelo.NombreCompleto = modelo.SearchDefault;
                    modelo.SearchDefault = "{" + Constantes.Seguridad.Usuario.listadopedido_filtro_nombrecompleto + ":" + modelo.NombreCompleto + "}";
                }
                else
                {
                    var res = modelo.SearchDefault.FormatSearch();
                    modelo.NombreCompleto = res.GetOrDefault(Constantes.Seguridad.Usuario.listadopedido_filtro_nombrecompleto);
                  //  modelo.Alias = res.GetOrDefault(Constantes.Seguridad.Usuario.listadopedido_filtro_aliasusuario);
                }
            }
            return View(modelo);
        }
        public JsonResult JsonListarSistemas(string nom)
        {

            var listadoTotal = SistemaData.BuscarSistemas(nom, "");
            var resjson1 = (new JqGridExtension<BuscarSistemasDto>()).DataBind(listadoTotal, listadoTotal.Count);
            return resjson1;

        }
        public PartialViewResult ModificarSistemaModal(int idsis)
        {
            var modelo = new InsertarModificarPaginaModel();
            //mapeando valores en el modelo
            if (idsis != 0)
            {
                var result = DataAccess.Seguridad.PaginaData.ObtenerPagina(idsis);
                modelo.pag_int_id = idsis;
                modelo.pag_bit_activo = result.pag_bit_activo;
                modelo.pag_str_descrip = result.pag_str_descrip;
                modelo.pag_str_nombre = result.pag_str_nombre;
                modelo.pag_str_url = result.pag_str_url;
                modelo.pag_bit_externo = result.pag_bit_externo;

            }

            return PartialView("_ModificarSistemaModal", modelo);
        }
        public PartialViewResult InsertarModificarSistemaModal(int? idsis)
        {
            var modelo = new InsertarModificarPaginaModel();
            //mapeando valores en el modelo
            if(idsis!=0)
            {
                var result =  DataAccess.Seguridad.SistemaData.ObtenerSistema(idsis);
                modelo.pag_int_id = idsis;
                modelo.pag_bit_activo = result.pag_bit_activo;
                modelo.pag_str_descrip = result.pag_str_descrip;
                modelo.pag_str_nombre = result.pag_str_nombre;
                modelo.pag_str_url = result.pag_str_url;
                
            }
         
            return PartialView("_InsertarModificarSistemaModal", modelo);
        }
        //[HttpPost]
        public ActionResult InsertarModificarSistemaModal1(InsertarModificarPaginaModel model)
        {
            model.pag_str_tipomenu = "M";
            model.pag_int_nivel = 1;
            var result =  DataAccess.Seguridad.SistemaData.InsertarSistema(this.ControllerContext, model);
            var modelo = new ListarSistemasModel();
            if (result == 0)
            {
                return Json(new { res = false }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { res = true  });
            }
        }

    }
   
}
