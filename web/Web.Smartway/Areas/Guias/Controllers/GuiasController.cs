
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
        public PartialViewResult NuevoDetalleGuia(long id)
        {

            var model = new GuiaRemisionDetalleModel();
            model.idguiaremision = id;

            return PartialView("_NuevoDetalleGuia", model);

        }
        [HttpPost]
        public JsonResult InsertarActualizarGuiaRemision(GuiaRemisionDetalleModel guiadetalle)
        {
            new DespachoData().InsertarActualizarGuiaRemisionDetalle(guiadetalle);
            return Json(new { res = true });
        }


        [HttpPost]
        public JsonResult GenerarGuiaRemision(ProgramacionModel model)
        {
            GuiaRemisionModel modGuia = new GuiaRemisionModel();
            modGuia.direcciondestino = model.direcciondestino;
            modGuia.direccionorigen = model.direccionorigen;
            modGuia.fechaguiaremision = model.fechaemision;
            modGuia.numeroguia = model.numeroguia;
            modGuia.iddestinatario = model.iddestinatario;
            modGuia.idusuarioregistro = Usuario.Idusuario;
            modGuia.idtransportista = model.idtransportista;
            

            modGuia.direcciondestino = model.direcciondestino;
            modGuia.direccionorigen = model.direccionorigen;

            modGuia.idestado = (int)Constantes.EstadoGuiaRemision.Despachado;
            modGuia.__tipooperacion = 1;
            var idguia = new DespachoData().InsertarActualizarGuiaRemision(modGuia);

            return Json(new { res = true });

        }
        [HttpPost]
        public JsonResult JsonGetListarGuias(int? idsucursaldestino, int? idsucursalorigen)
        {
            var listadoTotal = new DespachoData().GetListarGuia(null, null, null).ToList();
            var resjson1 = (new JqGridExtension<GuiaRemisionModel>()).DataBind(listadoTotal, listadoTotal.Count);
            return resjson1;
        }
        [HttpPost]
        public JsonResult JsonGetListarGuiaDetalles(long idguiaremision)
        {
            var listadoTotal = new DespachoData().GetListarGuiaDetalle(idguiaremision).ToList();
            var resjson1 = (new JqGridExtension<GuiaRemisionDetalleModel>()).DataBind(listadoTotal, listadoTotal.Count);
            return resjson1;
        }
    }
}