using QueryContracts.Smartway.Mantenimiento.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.Common.Controllers;
using Web.Smartway.Areas.Agendamiento.Models;
using Web.Smartway.DataAccess;
using Web.Smartway.DataAccess.Agendamiento;
using Web.Smartway.DataAccess.Mantenimiento;

namespace Web.Smartway.Areas.Agendamiento.Controllers
{
    public class PropuestaController : BaseController
    {
        public ActionResult Propuesta(long idincidencia)
        {

            var modeloSolucion = new SolucionModel();
            var dataIncidencia = new IncidenciaData();
            List<PropuestaModel> propuestas = new List<PropuestaModel>();

            var modIncidencia = dataIncidencia.ObtenerIncidencia(idincidencia);
            propuestas = new IncidenciaData().listarPropuestaSolucion((int)Constantes.TipoGarantia.SinGarantia).ToList();

            modeloSolucion.idincidencia = modIncidencia.idincidencia;
            modeloSolucion.anioincidencia = modIncidencia.anioincidencia;
            modeloSolucion.numeroincidencia = modIncidencia.numeroincidencia;
            modeloSolucion.requiereevaluacion = modIncidencia.requiereevaluacion;
            modeloSolucion.evaluacion = modIncidencia.evaluacionrealizada;
            modeloSolucion.falla = modIncidencia.falla;
            modeloSolucion.producto = modIncidencia.producto;
            modeloSolucion.requerimientocliente = modIncidencia.requerimientocliente;
            modeloSolucion.codigoproducto = modIncidencia.codigoproducto;
            modeloSolucion.idrequerimientocliente = modIncidencia.idrequerimientocliente;
            modeloSolucion.incidenciagarantia = modIncidencia.incidenciagarantia;
            modeloSolucion.idordenserviciotecnico = modIncidencia.idordenserviciotecnico;


            modeloSolucion.idpropuesta = modIncidencia.idpropuesta;
            modeloSolucion.idincidenciasolucion = modIncidencia.idincidenciasolucion;

            if (modIncidencia.engarantia)
            {
                if (modIncidencia.idtipogarantia == (Int32)(Constantes.TipoGarantia.Cliente))
                    modeloSolucion.garantia = "Con garantía de Cliente";
                else if (modIncidencia.idtipogarantia == (Int32)(Constantes.TipoGarantia.DAP))
                    modeloSolucion.garantia = "Con garantía DAP";
                else if (modIncidencia.idtipogarantia == (Int32)(Constantes.TipoGarantia.SinGarantia))
                    modeloSolucion.garantia = "Fuera de Garantía";
            }
            else
            {
                modeloSolucion.garantia = "Fuera de Garantía";
            }
            //if (modelo.Evaluacion)
            //{
            if (modIncidencia.engarantia)
                {
                    propuestas = new IncidenciaData().listarPropuestaSolucion(modIncidencia.idtipogarantia.Value).ToList();
                    modeloSolucion.resultadoevaluacion = "Procede por políticas de garantía";
                    modeloSolucion.engarantia = true;
                }
                else
                {
                    propuestas = new IncidenciaData().listarPropuestaSolucion((int)Constantes.TipoGarantia.SinGarantia).ToList();
                    modeloSolucion.resultadoevaluacion = "El equipo no está dentro de la garantía.";
                    modeloSolucion.engarantia = false; ;
                }
            //}
            //else
            //{
            //    propuestas = new IncidenciaData().listarPropuestaSolucion((int)Constantes.TipoGarantia.SinGarantia).ToList();
            //    modelo.ResultadoEvaluacion = "No procede por políticas de garantía.";
            //    modelo.engarantia = false; ;
            //}



            var listadopropuesta = new SelectList(
                propuestas, "idpropuesta", "descripcion");
            ViewData["ListaEstadosPropuestas"] = listadopropuesta;

            modeloSolucion.observacion = modIncidencia.observacionsolucion;
         //   modeloSolucion.idincidenciasolucion = modIncidencia.idincidenciasolucion;

            ViewData["ListaPropuestasEvaluacion"] = listadopropuesta;

            return View(modeloSolucion);
        }

        [HttpPost]
        public JsonResult RegistrarPropuesta(SolucionModel model)
        {

            //obtener propuesta individual (genera documentos)
            var propuesta = new AgendamientoData().obtenerPropuesta(model.idpropuesta.Value);
            //registrar propuesta  en incidencia

            var modelincidencia = new IncidenciaModel();
            modelincidencia.idincidencia = model.idincidencia;
            modelincidencia.engarantia = model.engarantia;




            //var model = new SolucionModel();
            model.fechahoraregistro = DateTime.Now;
            model.idusuarioregistro = Usuario.Idusuario;
            model.clientesatisfecho = true;





            if (propuesta.requiereaprobacion)
            {
                model.idestado = (Int32)Constantes.SolucionIncidentes.PendienteAprobacion;
                //enviar correo
            }
            else if (propuesta.idpropuesta == (int)Constantes.Propuesta.rechazada)
            {
                var modIncidencia = new IncidenciaData().ObtenerIncidencia(model.idincidencia.Value);
                modIncidencia.__tipooperacion = 3;// cambiar estado
                modIncidencia.idestado = (int)(Constantes.EstadoIncidencia.Cerrada);

                var result = new IncidenciaData().insertarActualizarIncidencia(modIncidencia);

                model.idestado = (Int32)Constantes.SolucionIncidentes.Rechazada;
            }
            else
                model.idestado = (Int32)Constantes.SolucionIncidentes.Aprobada;

            model.idpropuesta = model.idpropuesta;



            var idincidenciasolucion = new AgendamientoData().insertarIncidenciaSolucion(model);
            if (idincidenciasolucion > 0)
            {

                modelincidencia.__tipooperacion = 3; //Propuesta Solucion
                modelincidencia.idetapa = (Int32)Constantes.Etapa.Propuesta;

                new IncidenciaData().insertarActualizarIncidencia(modelincidencia);

                if (propuesta.requierecotizacion)
                {
                    return Json(new { res = true, cotizacion = true, idincidencia = (model.idincidencia.Value) });
                }
            }


            return Json(new { res = true, finalizar = true });





        }
        #region Antecedentes
        [HttpPost]
        public ActionResult listarAntecedentesClientes(long incidencia)
        {

            var listaAntecedentes = MantenimientoData.GetListarAntecedentesClientes(incidencia);
            var draw = Request.Form.GetValues("draw").FirstOrDefault();
            var start = Request.Form.GetValues("start").FirstOrDefault();
            var length = Request.Form.GetValues("length").FirstOrDefault();
            var sortColumn = Request.Form.GetValues("columns[" + Request.Form.GetValues("order[0][column]").FirstOrDefault() + "][name]").FirstOrDefault();
            var sortColumnDir = Request.Form.GetValues("order[0][dir]").FirstOrDefault();

            if (sortColumn != "" && sortColumnDir != "")
            {
                if (sortColumnDir.ToUpper() == "DESC")
                {
                    var parametro = sortColumn;
                    var propertyInfo = typeof(ListarAntecedentesIncidenteDto).GetProperty(parametro);
                    listaAntecedentes = listaAntecedentes.OrderByDescending(x => propertyInfo.GetValue(x, null)).ToList();
                }
                else
                {
                    var parametro = sortColumn;
                    var propertyInfo = typeof(ListarAntecedentesIncidenteDto).GetProperty(parametro);
                    listaAntecedentes = listaAntecedentes.OrderBy(x => propertyInfo.GetValue(x, null)).ToList();
                }
            }

            var displayedDocumentos = listaAntecedentes;
            int pageSize = length != null ? Convert.ToInt32(length) : 0;
            int skip = start != null ? Convert.ToInt32(start) : 0;
            int recordsTotal = 0;
            recordsTotal = displayedDocumentos.Count();
            var data = displayedDocumentos.Skip(skip).Take(pageSize).ToList();
            return Json(new { draw = draw, recordsFiltered = recordsTotal, recordsTotal = recordsTotal, data = data }, JsonRequestBehavior.AllowGet);


        }
        [HttpPost]
        public ActionResult listarAntecedentesProductos(long incidencia)
        {

            var listaAntecedentes = MantenimientoData.GetListarAntecedentesProductos(incidencia);
            var draw = Request.Form.GetValues("draw").FirstOrDefault();
            var start = Request.Form.GetValues("start").FirstOrDefault();
            var length = Request.Form.GetValues("length").FirstOrDefault();
            var sortColumn = Request.Form.GetValues("columns[" + Request.Form.GetValues("order[0][column]").FirstOrDefault() + "][name]").FirstOrDefault();
            var sortColumnDir = Request.Form.GetValues("order[0][dir]").FirstOrDefault();

            if (sortColumn != "" && sortColumnDir != "")
            {
                if (sortColumnDir.ToUpper() == "DESC")
                {
                    var parametro = sortColumn;
                    var propertyInfo = typeof(ListarAntecedentesIncidenteDto).GetProperty(parametro);
                    listaAntecedentes = listaAntecedentes.OrderByDescending(x => propertyInfo.GetValue(x, null)).ToList();
                }
                else
                {
                    var parametro = sortColumn;
                    var propertyInfo = typeof(ListarAntecedentesIncidenteDto).GetProperty(parametro);
                    listaAntecedentes = listaAntecedentes.OrderBy(x => propertyInfo.GetValue(x, null)).ToList();
                }
            }

            var displayedDocumentos = listaAntecedentes;
            int pageSize = length != null ? Convert.ToInt32(length) : 0;
            int skip = start != null ? Convert.ToInt32(start) : 0;
            int recordsTotal = 0;
            recordsTotal = displayedDocumentos.Count();
            var data = displayedDocumentos.Skip(skip).Take(pageSize).ToList();
            return Json(new { draw = draw, recordsFiltered = recordsTotal, recordsTotal = recordsTotal, data = data }, JsonRequestBehavior.AllowGet);


        }
        public PartialViewResult AntecedentesModal()
        {
            return PartialView("_AntecedentesModal");
        }
        #endregion  
    }
}