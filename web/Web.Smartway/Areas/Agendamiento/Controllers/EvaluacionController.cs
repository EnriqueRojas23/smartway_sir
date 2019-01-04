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
    public class EvaluacionController : BaseController 
    {

        #region Evaluacion

        [AcceptVerbs(HttpVerbs.Post)]
        public JsonResult realizarEvaluacion(EvaluacionModel modelo)
        {
            var dataIncidencia = new IncidenciaData();
            var modevaluacion = new EvaluacionModel();
            List<PropuestaModel> propuestas = new List<PropuestaModel>();

            var modIncidencia = dataIncidencia.ObtenerIncidencia(modelo.idincidencia.Value);
            var ListaCondiciones = dataIncidencia.ListarCondiciones(modIncidencia.idtipoproducto, modIncidencia.idfabricante).ToList();


            modelo.Evaluacion = true;

            //new AgendamientoData().eliminarEvaluacionPrevia(modelo.idincidencia);

            foreach (var item in modelo.ListaCondiciones)
            {
                var res = false;
                if (item.activo == null)
                    return Json(res);


                modevaluacion.idincidencia = modelo.idincidencia;
                modevaluacion.idcondicion = item.idcondicion;
                modevaluacion.valor = item.activo.Value;
                modevaluacion.idusuarioregistro = Usuario.Idusuario;
                modevaluacion.fechahoraregistro = DateTime.Now;


                new AgendamientoData().insertarIncidenciaEvaluacion(modevaluacion);

                //modevaluacion = new EvaluacionModel();

                var comparer = ListaCondiciones.Where(x => x.idcondicion.Equals(item.idcondicion)).Single().valor;

                if (!item.activo.Value == comparer)
                    modelo.Evaluacion = false;
            }


            modIncidencia.__tipooperacion = 2;
            if (!modelo.Evaluacion)
                modIncidencia.engarantia = false;
            else
                modIncidencia.engarantia = true;
            modIncidencia.idetapa =  (Int32) Constantes.Etapa.Evaluacion;

            new IncidenciaData().insertarActualizarIncidencia(modIncidencia);

            //var listadopropuesta = new SelectList(
            //    propuestas, "idpropuesta", "descripcion");
            //ViewData["ListaPropuestasEvaluacion"] = listadopropuesta;


            return Json(new { res = true });
                //PartialView("_EvaluacionIncidencia", modelo);
        }

        public ActionResult AtencionEvaluacion(long idincidencia)
        {
            var model = new EvaluacionModel();
            var dataIncidencia = new IncidenciaData();

            var incidenciaModel = dataIncidencia.ObtenerIncidencia(idincidencia);

            var productoModel = new ProductoData().obtenerProducto(incidenciaModel.idproducto);
            var detallecomprobante = FacturacionData.GetListarDetalleComprobante(incidenciaModel.iddocumentocompra).ToList();
            var evaluacion = AgendamientoData.ListarIncidenciaEvaluacion(idincidencia).ToList();

            #region asignacion de propiedades
            model.numeroincidencia = incidenciaModel.numeroincidencia;
            model.anioincidencia = incidenciaModel.anioincidencia;
            model.falla = incidenciaModel.falla;
            model.producto = incidenciaModel.producto;
            model.requerimientocliente = incidenciaModel.requerimientocliente;
            model.codigoproducto = incidenciaModel.codigoproducto;
            model.idrequerimientocliente = incidenciaModel.idrequerimientocliente;
            model.incidenciagarantia = incidenciaModel.incidenciagarantia;
            model.requiereevaluacion = incidenciaModel.requiereevaluacion;
            model.idordenserviciotecnico = incidenciaModel.idordenserviciotecnico;
            #endregion

            if (!incidenciaModel.incidenciagarantia) // No fue vendido en smartway ni en partner ni reparado en smartway
                return View("SeguimientoIncidencia"); // no puede ingresar a esta página

            if (detallecomprobante[0].idconceptofacturacion == (Int16)(Constantes.ConceptoFacturacion.Reparacion)) /// REPARADO EN SMARTWAY
            {
                ///Aca pensar en como se hará el tema del concepto de reparacion para la garantía
                ///
            }
            else
            {
                //vendido en smartway  o partner

                var garantias = dataIncidencia.ListarEvaluarGarantia(productoModel.idtipoproducto.Value
                , incidenciaModel.idfabricante
                , incidenciaModel.idpartner
                ).ToList();

                if (garantias != null && garantias.ToList().Count != 0)
                {
                    //Dar prioridad a la garantia DAP
                    //
                    var dap =  AgendamientoData.EvaluarGarantia(DateTime.Now.Date
                         , detallecomprobante[0].fechaemision
                         , garantias.Where(x => x.idtipogarantia.Equals((Int16)Constantes.TipoGarantia.DAP)).SingleOrDefault());

                    var garantia_cliente = AgendamientoData.EvaluarGarantia(DateTime.Now.Date
                        , detallecomprobante[0].fechaemision
                        , garantias.Where(x => x.idtipogarantia.Equals((Int16)Constantes.TipoGarantia.Cliente)).SingleOrDefault());

                    if (garantia_cliente)
                    {
                        garantias.ForEach(x =>
                        {
                            if (x.idtipogarantia.Equals((Int16)Constantes.TipoGarantia.Cliente))
                            {
                                x.resultado = true;
                                model.garantia = "Con garantía de Cliente";
                                model.engarantia = true;
                            }
                        }
                          );
                        model.idtipogarantia = (Int16)Constantes.TipoGarantia.Cliente;
                    }
                    if (dap)
                    {
                        garantias.ForEach(x =>
                        {
                            if (x.idtipogarantia.Equals((Int16)Constantes.TipoGarantia.DAP))
                            {
                                x.resultado = true;
                                model.garantia = "Con garantía DAP";
                                model.engarantia = true;
                            }
                        }
                           );
                        model.idtipogarantia = (Int16)Constantes.TipoGarantia.DAP;

                    }
                    if (garantia_cliente == false && dap == false)
                    {
                        model.garantia = "Fuera de garantía";
                        model.engarantia = false;
                    }
                }
                else
                {
                    model.garantia = "Fuera de garantía";
                    model.engarantia = false;
                    garantias.Add(new Mantenimiento.Models.GarantiaModel() { descripcion = "No existen garantias registradas para este producto" });
                }
                model.idincidencia = idincidencia;
                model.ListaGarantias = garantias;
                model.ListaCondiciones =

                    dataIncidencia.ListarCondiciones
                    (incidenciaModel.idtipoproducto, incidenciaModel.idfabricante).ToList();


              

                model.idetapa = incidenciaModel.idetapa;

                if (incidenciaModel.idetapa  >= 2)
                {
                    int i = 0;

                    evaluacion = evaluacion.OrderBy(x => x.idcondicion).ToList();

                    foreach (var item in model.ListaCondiciones.OrderBy(x=>x.idcondicion).ToList())
                    {
                        if (item.idcondicion == evaluacion[i].idcondicion)
                            item.activo = evaluacion[i].valor;
                        i++;
                    }
                    model.Evaluacion = true;
                    model.ListaCondiciones = model.ListaCondiciones.OrderByDescending(x => x.valor).ToList();
                }
                else
                {
                    model.ListaCondiciones = model.ListaCondiciones.OrderByDescending(x => x.valor).ToList();
                    foreach (var item in model.ListaCondiciones)
                    {
                        if (item.valor)
                            item.activo = true;
                        else item.activo = false;
                    }
                }
            }

            if (model.ideva.HasValue)
                model.evaluacionrealizada = true;
            else
                model.evaluacionrealizada = false;

            //if (incidenciaModel.idcoti.HasValue)
            //    model.cotizacionrealizada = true;
            //else
            //    model.cotizacionrealizada = false;

            return View(model);
        }
        #endregion
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