
using System.Web.Mvc;
using Web.Common.Controllers;
using Web.Smartway.DataAccess;
using Web.Smartway.DataAccess.Mantenimiento;
using System.Linq;
using Web.Smartway.Areas.Despacho.Models;
using Web.Common.Extensions;
using Web.Smartway.Areas.Agendamiento.Models;

namespace Web.Smartway.Areas.Guias.Controllers
{
    public class GuiasController : BaseController
    {
        public ActionResult ListarGuias()
        {
            var sucursal = new SucursalData().ListarSucursal("", "", null, Usuario.idpartner);
            var listasucursal = new SelectList(
               sucursal,
               "idsucursal",
               "nombre");
            ViewData["listasucursal"] = listasucursal;


            //var estado = MantenimientoData.GetListarEstado((Int32)Constantes.MaestroTablas.g);
            //var listadoestado = new SelectList(estado, "idestado", "estado");
            //ViewData["listadoestado"] = listadoestado;


            return View();
        }
        public PartialViewResult NuevaGuia()
        {
            var sucursal = new SucursalData().ListarSucursal("", "", null, Usuario.idpartner);
            var listasucursal = new SelectList(
               sucursal,
               "idsucursal",
               "nombre");
            ViewData["listasucursal"] = listasucursal;

            var clientes = MantenimientoData.GetListarClientes(null, true).ToList();
            var listaclientes = new SelectList(
                   clientes,
                   "idcliente",
                   "nombre");
            ViewData["ListadoClientes"] = listaclientes;

            var transportista = new DespachoData().GetListarTransportista();
            var listadotransportista = new SelectList(transportista, "idtransportista", "razonsocial");
            ViewData["listadotransportista"] = listadotransportista;


            return PartialView("_NuevaGuiaRemision");

        }

        [HttpPost]
        public JsonResult GenerarGuiaRemision(ProgramacionModel model)
        {

            return Json(new { res = true });

        }
        public JsonResult JsonGetListarGuias(int? idsucursaldestino, int? idsucursalorigen
                , string sord
             , int page
             , int rows)
        {
            var listadoTotal = new DespachoData().GetListarGuia(31, null, null).ToList();
            var resjson1 = (new JqGridExtension<GuiaRemisionModel>()).DataBind(listadoTotal, listadoTotal.Count);
            return resjson1;
        }







    }
}