
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
            GuiaRemisionModel modGuia = new GuiaRemisionModel();
            modGuia.direcciondestino = model.direcciondestino;
            modGuia.direccionorigen = model.direccionorigen;
            modGuia.fechaguiaremision = model.fechaemision;
            modGuia.numeroguia = model.numeroguia;
            modGuia.idcliente = model.idcliente;

            modGuia.direcciondestino = model.direcciondestino;
            modGuia.direccionorigen = model.direccionorigen;

            modGuia.idestado = (int)Constantes.EstadoGuiaRemision.Despachado;
            modGuia.__tipooperacion = 1;
            var idguia = new DespachoData().InsertarActualizarGuiaRemision(modGuia);

            return Json(new { res = true });

        }
        public JsonResult JsonGetListarGuias(int? idsucursaldestino, int? idsucursalorigen
                , string sord
             , int page
             , int rows)
        {
            var listadoTotal = new DespachoData().GetListarGuia(null, null, null).ToList();
            var resjson1 = (new JqGridExtension<GuiaRemisionModel>()).DataBind(listadoTotal, listadoTotal.Count);
            return resjson1;
        }
    }
}