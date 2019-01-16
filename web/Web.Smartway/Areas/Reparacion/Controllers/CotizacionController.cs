using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.Common.Controllers;
using Web.Common.Extensions;
using Web.Smartway.Areas.Reparacion.Models;
using Web.Smartway.DataAccess;
using Web.Smartway.DataAccess.Agendamiento;
using Web.Smartway.DataAccess.Mantenimiento;
using Web.Smartway.DataAccess.Reparaciones;
using Web.Smartway.DataAccess.Venta;

namespace Web.Smartway.Areas.Reparacion.Controllers
{
    public class CotizacionController : BaseController
    {

        #region cotizar
        public ActionResult Cotizar(long idordentrabajo)
        {

            Session["CotizacionDetalleModel"] = null;
            var model = new VentaCotizacionModel();
            var dataIncidencia = new IncidenciaData();
            var listadoactual = new List<VentaCotizacionDetalleModel>();


            var modOrdenTrabajo = new ReparacionesData().obtenerOrdenTrabajo(idordentrabajo);
            var modOrdenServicio = new OrdenServicioData().obtenerOrdenServicio(modOrdenTrabajo.idordenserviciotecnico.Value);
            var modIncidencia = new IncidenciaData().ObtenerIncidencia(modOrdenServicio.idincidencia.Value);

            //var listadoTotal = new VentaData().listarCotizacionDetalle(idincidencia).ToList();

            //var modIncidencia = dataIncidencia.ObtenerIncidencia(idincidencia);
            //var modSucursal = new SucursalData().obtenerSucursal(modIncidencia.idsucursal);





            #region EvaluacionDeGarantia

            //model.engarantia = modIncidencia.engarantia;
            //if (model.engarantia)
            //{
            //    if (modIncidencia.idtipogarantia == (Int32)(Constantes.TipoGarantia.Cliente))
            //        model.garantia = "Con garantía de Cliente";
            //    else if (modIncidencia.idtipogarantia == (Int32)(Constantes.TipoGarantia.DAP))
            //        model.garantia = "Con garantía DAP";
            //    else if (modIncidencia.idtipogarantia == (Int32)(Constantes.TipoGarantia.SinGarantia))
            //        model.garantia = "Sin Garantia";
            //}

            #endregion

            //if (listadoTotal.Count > 0)
            //{
            //    Session["CotizacionDetalleModel"] = listadoTotal;
            //    model.idsucursalreparacion = listadoTotal[0].idsucursalreparacion;
            //    model.str_total = (Convert.ToDecimal(listadoTotal.Sum(x => x.costo).ToString()) * (decimal)(1.00)).ToString("0.##");
            //    model.str_subtotal = (Convert.ToDecimal(model.str_total) / (decimal)(1.18)).ToString("0.##");
            //    model.str_igv = (Convert.ToDecimal(model.str_total) - Convert.ToDecimal(model.str_subtotal)).ToString("0.##");
            //    model.idcotizacion = listadoTotal[0].idcotizacion;
            //    model.iddirecciondelivery = listadoTotal[0].iddirecciondelivery;
            //    model.idsucursalreparacion = listadoTotal[0].idsucursalreparacion;
            //}
            //else
            //{
            //    if (!model.engarantia)
            //    {
            //        //listadoTotal.Add(new CotizacionDetalleModel
            //        //{
            //        //    costo = Convert.ToDecimal(20.00),
            //        //    descripcion = "Servicio de Reparación"
            //        //});
            //        //listadoTotal.Add(new CotizacionDetalleModel
            //        //{
            //        //    costo = Convert.ToDecimal(10.00),
            //        //    descripcion = "Delivery"
            //        //});
            //    }
            //    Session["CotizacionDetalleModel"] = listadoTotal;

            //}


            #region combos


            var sucursal = new SucursalData().ListarSucursal("", "", null, (Int32)Constantes.Partner.Smartway).Where(x => x.reparacion);

            var listasucursal = new SelectList(
               sucursal,
               "idsucursal",
               "nombre");


            ViewData["listasucursal"] = listasucursal;


            var diagnostico = new DiagnosticoData().listarDiagnostico(null, null, modIncidencia.idtipoproducto, modOrdenServicio.engarantia);
            var listadiagnostico = new SelectList(diagnostico, "iddiagnostico", "descripcion");
            ViewData["listadiagnostico"] = listadiagnostico;

            #endregion

            #region Asignar propiedades cotizacion Model

            model.numeroincidencia = modIncidencia.numeroincidencia;
            model.falla = modIncidencia.falla;
            model.producto = modIncidencia.producto;
            model.codigoproducto = modIncidencia.codigoproducto;
            model.fechaasignacion = modOrdenTrabajo.fechahoraasignacion.Value;
            model.idpartner  = modIncidencia.idpartner;
            model.idtipoproducto = modIncidencia.idtipoproducto;
            model.idfabricante = modIncidencia.idfabricante;
            model.idsucursal = modIncidencia.idsucursal;
            model.idproducto = modIncidencia.idproducto;

            #endregion

            return View(model);
        }

        [HttpPost]
        public JsonResult cargarReparacion(int iddiagnostico, int idtipoproducto, int idfabricante)
        {

            var diagnostico = new DiagnosticoData().listarDiagnostico(null, null, null, null, iddiagnostico).ToList();

            var reparacion = new ReparacionData().listarReparacion(diagnostico[0].idcategoriareparacion, idtipoproducto, null);
            var listareparacion = new SelectList(
                reparacion,
                "idreparacion",
                "descripcion");
            return Json(new { listareparacion });
        }

        [HttpPost]
        public JsonResult cargarRepuestos(int idreparacion, int idproducto)
        {
            var respuestos = new IncidenciaData().listarRepuestos(idreparacion, idproducto).ToList();
            var listarepuestos = new SelectList(
                respuestos,
                "idproducto",
                "descripcionlarga");
            return Json(new { listarepuestos });

        }
        [HttpPost]
        public JsonResult JsonGetListarDetalleCotizacion(long idordentrabajo )
        {
            //var listadoTotal = VentaData.listarCotizacionDetalle(idordentrabajo).ToList();
            //if (listadoTotal.Count == 0 || listadoTotal == null)
            //{
              var  listadoTotal = (List<VentaCotizacionDetalleModel>)Session["CotizacionDetalleModel"];

            if (listadoTotal == null)
                return null;
                   // listadoTotal = new List<VentaCotizacionDetalleModel>();
            //}
            var resjson1 = (new JqGridExtension<VentaCotizacionDetalleModel>()).DataBind(listadoTotal, listadoTotal.Count);
            return resjson1;
        }

        [HttpPost]
        public JsonResult EliminarDetalleCotizacion(int index, bool engarantia)
        {
            var listadoactual = (List<VentaCotizacionDetalleModel>)Session["CotizacionDetalleModel"];

            var retirar = listadoactual.Where(x => x.index.Equals(index)).Single();
            listadoactual.Remove(retirar);


            Session["CotizacionDetalleModel"] = listadoactual;
            //var total = listadoactual.Sum(x => x.costo);
            //var subtotal = total / (decimal)(1.18);
            //var igv = total - subtotal;

            if (!engarantia)
            {
                var total = listadoactual.Where(x => x.repuesto == null).Sum(x => x.costototal);
                var subtotal = (double)(total) / 1.18;
                var igv = total - (decimal)subtotal;
                return Json(new { res = true, total = total, subtotal = subtotal, igv = igv });
            }
            else
            {
                var total = listadoactual.Where(x => x.repuesto == null).Sum(x => x.costototal);
                var subtotal = Convert.ToDouble("0.0");
                var igv = Convert.ToDouble("0.0");
                return Json(new { res = true, total = total, subtotal = subtotal, igv = igv });
            }


        }

        //[HttpPost]
        //public JsonResult AgregarDelivery(int iddireccion, bool engarantia)
        //{
        //    int index = 0;
        //    var listadoactual = (List<CotizacionDetalleModel>)Session["CotizacionDetalleModel"];
        //    if (listadoactual != null)
        //        index = listadoactual.Count;
        //    else
        //        listadoactual = new List<CotizacionDetalleModel>();

        //    listadoactual.Add(new CotizacionDetalleModel
        //    {
        //        index = index + 1,
        //        costo = Convert.ToDecimal(10.00),
        //        descripcion = "Delivery"
        //    });

        //    Session["CotizacionDetalleModel"] = listadoactual;



        //    if (!engarantia)
        //    {
        //        var total = listadoactual.Sum(x => x.costo);
        //        var subtotal = (double)(total) / 1.18;
        //        var igv = total - (decimal)subtotal;
        //        return Json(new { res = true, total = total, subtotal = subtotal, igv = igv });
        //    }
        //    else
        //    {
        //        var total = Convert.ToDouble("10.0");
        //        var subtotal = (total) / 1.18;
        //        var igv = total - subtotal;

        //        return Json(new { res = true, total = total, subtotal = subtotal, igv = igv });
        //    }



        //}

        [HttpPost]
        public JsonResult LimpiarCotizacion()
        {
            Session["CotizacionDetalleModel"] = null;
            return Json(new { res = true, total = "0.0", subtotal = "0.0", igv = "0.0" });
        }

        [HttpPost]
        public JsonResult CotizarIncidencia(int? iddiagnostico
            , int? idreparacion
            , int? idrepuesto
            , int? idpartner
            , int? idtipoproducto)
        {


            var modRepuesto = new ProductoData().obtenerProducto(idrepuesto.Value);



            var diagnostico = new DiagnosticoData().listarDiagnostico(null, null, null, null, iddiagnostico).FirstOrDefault();
            var aux = new ReparacionData().listarReparacion(null, null, idreparacion.Value).ToList();
            var modReparacion = aux.Where(x => x.idreparacion.Value.Equals(idreparacion)).FirstOrDefault();

            var modServicioReparacion = new AgendamientoData().calcularTarifa(
                   idtipoproducto.Value
                   , modReparacion.idnivelreparacion
                   , idpartner.Value);


            var listadoactual = (List<VentaCotizacionDetalleModel>)Session["CotizacionDetalleModel"];
            if (listadoactual == null)
                listadoactual = new List<VentaCotizacionDetalleModel>();

            listadoactual.Add(new VentaCotizacionDetalleModel
            {
                 costototal = modRepuesto.costounitario,
                descripcion = "Repuesto",
                diagnostico = diagnostico.descripcion,
                reparacion = modReparacion.descripcion,
                repuesto = modRepuesto.descripcionlarga,
                iddiagnostico = iddiagnostico.Value,
                idrepuesto = idrepuesto.Value,
                idreparacion = idreparacion.Value


            });

            if (modServicioReparacion != null)
            {
                var servrep = listadoactual.Where(x => x.descripcion.Equals("Servicio")).FirstOrDefault();

                if (servrep == null)
                {
                    listadoactual.Add(new VentaCotizacionDetalleModel
                    {
                        costototal = modServicioReparacion.costo.Value,
                        descripcion = "Servicio",
                        diagnostico = modServicioReparacion.nivelreparacion,
                        reparacion = modReparacion.descripcion,
                        repuesto = modRepuesto.descripcionlarga,
                        iddiagnostico = iddiagnostico.Value,
                        idrepuesto = idrepuesto.Value,
                        idreparacion = idreparacion.Value


                    });
                }
                else
                {
                    if (servrep.costototal < modServicioReparacion.costo.Value)
                    {
                        listadoactual.Add(new VentaCotizacionDetalleModel
                        {
                            costototal = modServicioReparacion.costo.Value,
                            descripcion = "Servicio",
                            diagnostico = modServicioReparacion.nivelreparacion,
                            reparacion = modReparacion.descripcion,
                            repuesto = modRepuesto.descripcionlarga,
                            iddiagnostico = iddiagnostico.Value,
                            idrepuesto = idrepuesto.Value,
                            idreparacion = idreparacion.Value


                        });
                    }
                }
            }
            Session["CotizacionDetalleModel"] = listadoactual;

  
                var total = listadoactual.Where(x => x.repuesto == null).Sum(x => x.costototal);
                var subtotal = (double)(total) / 1.18;
                var igv = total - (decimal)subtotal;
                return Json(new { res = true, total = total, subtotal = subtotal, igv = igv });

        }
        public JsonResult registrarCotizacion(int? idsucursalreparacion, long? idordentrabajo)
        {

            var model = new VentaCotizacionModel();
            var modelDetalle = new VentaCotizacionDetalleModel();
            var listadoactual = (List<VentaCotizacionDetalleModel>)Session["CotizacionDetalleModel"];

            var modOrdenTrabajo = new ReparacionesData().obtenerOrdenTrabajo(idordentrabajo.Value);
            var modOrdenServicio = new OrdenServicioData().obtenerOrdenServicio(modOrdenTrabajo.idordenserviciotecnico.Value);


            model.fechahoraregistro = DateTime.Now;
            model.idusuarioregistro = Usuario.Idusuario;
            model.idsucursal = idsucursalreparacion.Value;
            model.idordenservicio = modOrdenTrabajo.idordenserviciotecnico.Value;
            model.idcliente = modOrdenServicio.idcliente;
            model.idmoneda = 8;
          
            
            model.str_total = (Convert.ToDecimal(listadoactual.Sum(x => x.costototal).ToString()) * (decimal)(1.00)).ToString("0.##");
            model.str_subtotal = (Convert.ToDecimal(model.str_total) / (decimal)(1.18)).ToString("0.##");
            model.str_igv = (Convert.ToDecimal(model.str_total) - Convert.ToDecimal(model.str_subtotal)).ToString("0.##");

            model.total = Convert.ToDecimal(model.str_total);
            model.subtotal = Convert.ToDecimal(model.str_subtotal);
            model.igv = Convert.ToDecimal(model.str_igv);

            model.generoventa = false;
            model.__tipooperacion = 1;
            var idcotizacion = new VentaData().insertarActualizarCotizacion(model);

          




            foreach (var item in listadoactual)
            {
                modelDetalle = new VentaCotizacionDetalleModel();
                modelDetalle.idcotizacion = idcotizacion;
                modelDetalle.costototal = item.costototal;
                modelDetalle.iddiagnostico = item.iddiagnostico;
                modelDetalle.descripcion = item.descripcion;
                modelDetalle.idreparacion = item.idreparacion;
                modelDetalle.idproducto = item.idrepuesto;
            

                new VentaData().insertarActualizarDetalleCotizacion(modelDetalle);

                #region registrar_reparacion

                //var modelReparacionDetalle = new OrdenTrabajoDetalleModel();
                //modelReparacionDetalle.costo = item.costototal;
                //modelReparacionDetalle.descripcion = item.descripcion;
                //modelReparacionDetalle.iddiagnostico = item.iddiagnostico;
                //modelReparacionDetalle.idreparacion = item.idreparacion;
                //modelReparacionDetalle.idrepuesto = item.idrepuesto;
                //modelReparacionDetalle.idordentrabajo = idordentrabajo.Value;


                //modelReparacionDetalle.__idoperacion = 1;
                //new ReparacionesData().InsertarActualizarOrdenTrabajoDetalle(modelReparacionDetalle);


                #endregion
            }





            modOrdenServicio.idestado = (Int32)Constantes.EstadoOrdenServicio.EnEsperaRespuestaCliente;
            modOrdenServicio.__tipooperacion = 2;
            new OrdenServicioData().InsertarActualizarOrdenServicio(modOrdenServicio);



            //modOrdenTrabajo.idusuarioregistro = Usuario.Idusuario;
            //modOrdenTrabajo.numeroordentrabajo = "100-0000067661";
            //modOrdenTrabajo.fechahoraregistro = DateTime.Now;
            modOrdenTrabajo.idestado = (Int32)Constantes.EstadoOrdenTrabajo.CotizacionCompleta;
            modOrdenTrabajo.__tipooperacion = 2;


            new ReparacionesData().InsertarActualizarOrdenTrabajo(modOrdenTrabajo);


            return Json(new { res = true });

        }
        #endregion
    }
}