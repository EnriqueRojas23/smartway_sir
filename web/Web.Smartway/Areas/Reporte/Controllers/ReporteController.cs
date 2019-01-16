using System;
using System.Web.Mvc;
using Web.Common.Controllers;
using Web.Smartway.DataAccess;
using Web.Smartway.DataAccess.Mantenimiento;


namespace Web.Smartway.Areas.Reparacion.Controllers
{
    public class ReporteController : BaseController
    {

        public ActionResult BaseIngreso()
        {
            var estado = MantenimientoData.GetListarEstado((Int32)Constantes.MaestroTablas.OrdenServicio);
            var listadoestado = new SelectList(estado, "idestado", "estado");
            ViewData["listadoestado"] = listadoestado;

            return View();
        }
        public ActionResult BaseIngenico()
        {
            var estado = MantenimientoData.GetListarEstado((Int32)Constantes.MaestroTablas.OrdenServicio);
            var listadoestado = new SelectList(estado, "idestado", "estado");
            ViewData["listadoestado"] = listadoestado;

            return View();
        }


    }
}