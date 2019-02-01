using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using Web.Common.Controllers;
using Web.Common.Extensions;
using Web.Smartway.Areas.Agendamiento.Models;
using Web.Smartway.Areas.Inventario.Models;
using Web.Smartway.Areas.Mantenimiento.Models;
using Web.Smartway.Areas.Reparacion.Models;
using Web.Smartway.DataAccess;
using Web.Smartway.DataAccess.Agendamiento;
using Web.Smartway.DataAccess.Inventario;
using Web.Smartway.DataAccess.Mantenimiento;
using Web.Smartway.DataAccess.Reparaciones;
using Web.Smartway.DataAccess.Seguridad;
using Web.Smartway.DataAccess.Venta;

namespace Web.Smartway.Areas.Agendamiento.Controllers
{
    public class OrdenServicioController : BaseController 
    {
        public ActionResult SeguimientoOrdenes()
        {
            var estado = MantenimientoData.GetListarEstado((int)Constantes.MaestroTablas.OrdenServicio);
            var listadoestado = new SelectList(estado, "idestado", "estado");
            ViewData["listadoestado"] = listadoestado;
            ViewData["listadotipoorden"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.TipoOrdenServicio);


            return View();
        }
        [HttpPost]
        public JsonResult JsonGetListarOrdenesServicio(int? idtipoordenservicio, int? idestado, string fechainicio, string fechafin, string numeroordenservicio)
        {

            if (numeroordenservicio == "")
                numeroordenservicio = null;
            if (fechainicio == "")
                fechainicio = null;
            if (fechafin == "")
                fechafin = null;


            var listadoTotal =  new OrdenServicioData().listarOrdenServicio(idtipoordenservicio,idestado, fechainicio, fechafin,  numeroordenservicio).ToList();
            var resjson1 = (new JqGridExtension<OrdenServicioModel>()).DataBind(listadoTotal, listadoTotal.Count);
            return resjson1;
        }
        [HttpPost]  
        public JsonResult JsonGetListarDetalleCotizacion(long idordenservicio)
        {
            var listadoTotal = VentaData.listarCotizacionDetalle(idordenservicio).ToList();
            //if (listadoTotal.Count == 0 || listadoTotal == null)
            //{
           // var listadoTotal = (List<VentaCotizacionDetalleModel>)Session["CotizacionDetalleModel"];

            if (listadoTotal == null)
                return null;
            // listadoTotal = new List<VentaCotizacionDetalleModel>();
            //}
            var resjson1 = (new JqGridExtension<VentaCotizacionDetalleModel>()).DataBind(listadoTotal, listadoTotal.Count);
            return resjson1;
        }
        public ActionResult DetalleOrdenServicio(long idordenservicio)
        {
            var ordenServicio = new OrdenServicioData().obtenerOrdenServicio(idordenservicio);


            //var ordentrabajo = new ReparacionesData().obtenerOrdenTrabajo(ordenServicio.idordentrabajo.Value);
            var listadoactual = VentaData.listarCotizacionDetalle(idordenservicio).ToList();


            var model = new IncidenciaData().ObtenerIncidencia(ordenServicio.idincidencia.Value);
            model.idestado = ordenServicio.idestado;


            model.total = Math.Round(listadoactual.Sum(x => x.costototal), 2);
            model.subtotal = Math.Round(Convert.ToDecimal(model.total / Convert.ToDecimal(1.18)),2);
            model.igv = Math.Round(model.total - model.subtotal, 2);


    
            model.editar = false;
            model.direccion = model.direccioncliente;
            if (listadoactual.Count > 0)
                model.idcotizacion = listadoactual[0].idcotizacion;

            var perfiles = Usuario.Perfiles;
            //Validar si es admin
            var autorizar = perfiles.Where(x => x.IdPerfil.Equals
                         (Convert.ToInt32(Constantes.Perfil.Admin))).SingleOrDefault();

            if (autorizar != null)
            {
                var sucursal = new SucursalData().ListarSucursal("", "", null);
                var listasucursal = new SelectList(
                   sucursal,
                   "idsucursal",
                   "nombre");
                ViewData["listasucursal"] = listasucursal;
                model.editarsucursal = true;
                model.idsucursal = Usuario.idsucursal;

            }


            ViewData["ListaTipoComprobante"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.TipoDocumentoCompra);
            ViewData["ListaCondicionReclamo"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.CondicionReclamo);
            ViewData["ListaTipoDocumento"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.TipoDocumento);
            ViewData["ListaTipoRequerimiento"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.RequerimientoCliente);

            var direccion = MantenimientoData.GetListarDireccionesxCliente(10);
            var listadirecciones = new SelectList(direccion, "iddireccion", "direccion");
            ViewData["listadireccion"] = listadirecciones;

            var falla = new FallaData().listarFalla(null, null);
            var listafalla = new SelectList(falla, "idfalla", "descripcion");

            ViewData["listafalla"] = listafalla;

            var tipoproducto = new ProductoData().listarTipoProducto();
            var listatipoproducto = new SelectList(
                 tipoproducto
                , "idtipoproducto"
                , "nombre"
                );
            ViewData["listatipoproducto"] = listatipoproducto;

            var producto = new ProductoData().listarProducto("", "", null, null, null,false);
            var listaproducto = new SelectList(producto, "idproducto", "descripcionlarga");
            ViewData["listaproducto"] = listaproducto;

            var fabricante = new PartnerData().ListarPartner(null, null);
            var listafabricante = new SelectList(
                 fabricante
                , "idpartner"
                , "razonsocial"
                );
            ViewData["listafabricante"] = listafabricante;
            var partners = new PartnerData().ListarPartner(null, null);
            var listapartners = new SelectList(
                 partners
                , "idpartner"
                , "razonsocial"
                );
            ViewData["listapartner"] = listapartners;
            var modelAtencion = new EvaluacionModel();

            model.ListaAccesorios = GetListaAccesorios();
            if (model.accesorios != null)
                model.AccesoriosSeleccionados = model.accesorios.Split(',').ToArray();
            ViewData["ListaEstadosFiProducto"] = MantenimientoData.GetListarValoresxTabla(Convert.ToInt32(Constantes.MaestroTablas.TipoDano));

            ViewBag.Base64StringSuperior = "data:image/png;base64," + Convert.ToBase64String(model.partesuperior, 0, model.partesuperior.Length);
            ViewBag.Base64StringInferior = "data:image/png;base64," + Convert.ToBase64String(model.parteinferior, 0, model.parteinferior.Length);
            ViewBag.Base64StringDelantera = "data:image/png;base64," + Convert.ToBase64String(model.partedelantera, 0, model.partedelantera.Length);
            ViewBag.Base64StringPosterior = "data:image/png;base64," + Convert.ToBase64String(model.parteposterior, 0, model.parteposterior.Length);
            ViewBag.Base64StringDerecha = "data:image/png;base64," + Convert.ToBase64String(model.partederecha, 0, model.partederecha.Length);
            ViewBag.Base64StringIzquierda = "data:image/png;base64," + Convert.ToBase64String(model.parteizquierda, 0, model.parteizquierda.Length);


            return View(model);
        }
        private IEnumerable<SelectListItem> GetListaAccesorios()
        {
            List<SelectListItem> ListaAccesorios = new List<SelectListItem>();
            var Lista = AgendamientoData.GetListarAccesorios();

            foreach (AccesorioModel Accesorio in Lista)
            {
                ListaAccesorios.Add(new SelectListItem { Value = Accesorio.idaccesorio.ToString(), Text = Accesorio.descripcion });
            }
            return ListaAccesorios.AsEnumerable();
        }

        [HttpPost]
        public JsonResult EntregarAlCliente(long idordenservicio)
        {
            var modOrdenServicio = new OrdenServicioData().obtenerOrdenServicio(idordenservicio);
            modOrdenServicio.idordenserviciotecnico = idordenservicio;
            modOrdenServicio.idestado = (Int32)Constantes.EstadoOrdenServicio.Cerrada;
            modOrdenServicio.__tipooperacion = 2;
            new OrdenServicioData().InsertarActualizarOrdenServicio(modOrdenServicio);

            var ModInventario = new InventarioModel();
            ModInventario.idinventario = modOrdenServicio.idinventario;
            ModInventario.idestado = (Int32)Constantes.EstadoProducto.NoDisponible;
            ModInventario.__idoperacion = 4;// Actualizar Estado

            new InventarioData().InsertarActualizarInventario(ModInventario); 







            return Json(new { res = true });
        }
        [HttpPost]
        public JsonResult obtenerOrdenServicio(string numeroordenservicio)
        {
            string fechainicio = null;
            string fechafin = null;

            var jsonObject = new OrdenServicioData().listarOrdenServicio(null, null, fechainicio, fechafin, numeroordenservicio).FirstOrDefault();
            jsonObject.producto = jsonObject.producto + " " + jsonObject.modelo + " - Serie [" + jsonObject.serie + "]  IMEI [" + jsonObject.imei + "] Accesorios:  [" + jsonObject.accesorios+ "]";
            return Json(new { jsonObject , res = true });
        }


        [HttpPost]
        public JsonResult AprobarDesaprobarCotizacion(long idcotizacion , string estado, long idordenservicio)
        {
            var model = new VentaCotizacionModel();
            var modOrdenServicio = new OrdenServicioData().obtenerOrdenServicio(idordenservicio);
            var modOrdenTrabajo = new OrdenTrabajoModel();
            var TrabajoDetalleModel = new OrdenTrabajoDetalleModel();

            if (estado == "aprobado")
            {
                modOrdenServicio.idestado = (Int32)Constantes.EstadoOrdenServicio.PendienteInicioReparacion;
                modOrdenServicio.cotizado = true;
                modOrdenTrabajo.idestado = (Int32)Constantes.EstadoOrdenTrabajo.Asignada;
                model.aceptado = true;
            }
            else if (estado == "rechazado")
            {
                modOrdenServicio.idestado = (Int32)Constantes.EstadoOrdenServicio.PendienteEntregaCliente;
                modOrdenTrabajo.idestado = (Int32)Constantes.EstadoOrdenTrabajo.Completada;
                model.aceptado = false;
            }

            
            modOrdenServicio.__tipooperacion = 2;
            modOrdenTrabajo.__tipooperacion = 2;
            model.__tipooperacion = 2;
       
            model.idcotizacion = idcotizacion;
            modOrdenServicio.idordenserviciotecnico = idordenservicio;
            modOrdenTrabajo.idordentrabajo = modOrdenServicio.idordentrabajo;
            


            new ReparacionesData().InsertarActualizarOrdenTrabajo(modOrdenTrabajo);
            new VentaData().insertarActualizarCotizacion(model);
            new OrdenServicioData().InsertarActualizarOrdenServicio(modOrdenServicio);




            #region registrar reparaciones


            TarifaModel modTarifa;
            AlmacenModel modAlmacen;

            var usuario = UsuariosData.ObtenerUsuario(16);

            var listadoTotal = VentaData.listarCotizacionDetalle(idordenservicio).ToList();

            foreach (var item in listadoTotal)
            {
                if (item.descripcion != "Repuesto") continue;
                var modRepuesto = new ProductoData().obtenerProducto(item.idproducto);
                modAlmacen = new InventarioData().obtenerAlmacen(Constantes.CodAlmacen.Telecom_Repuestos);
                var existerepuesto = new InventarioData().obtenerInventario(modAlmacen.idalmacen.Value, item.idproducto, 45);

                #region enviomail
                StringBuilder sb = new StringBuilder();
                sb.Append("<table width='100%' cellpadding='0' cellspacing='0' border='0' dir='ltr' style='font-size:16px;background-color:rgb(227,225,225)'>");
                sb.Append("<tbody>");
                sb.Append("<tr>");
                sb.Append("        <td align='center' valign='top' style='margin:0;padding:40'>");
                sb.Append("            <table align='center' border='0' cellspacing='0' cellpadding='0' width='700' bgcolor='#1ab394' style='width:700px;border:1px solid ");
                sb.Append("         transparent; ");
                sb.Append("order-radius:13px;margin:auto;background-color:#18a689'>");
                sb.Append("                <tbody>");
                sb.Append("					<tr>");
                sb.Append("					<td>");
                sb.Append("						<table cellpadding='0' cellspacing='0' border='0' width='100%'>");
                sb.Append("						<tbody>");
                sb.Append("							<tr>");
                sb.Append("							<td valign='top' align='left' style='padding:0px;margin:0px'>");
                sb.Append("								<table cellpadding='0' cellspacing='0' border='0' width='100%'>");
                sb.Append("								<tbody>");
                sb.Append("									<tr>");
                sb.Append("									<td align='left' valign='top'>");
                sb.Append("									<table width='100%' border='0' cellpadding='0' cellspacing='0' align='center'>");
                sb.Append("										<tbody>");
                sb.Append("											<tr>");
                sb.Append("											<td align='left' valign='top' style='font-family:Arial,Helvetica,sans-serif;font-size:20px;border-radius:6px");
                sb.Append("	                                        color:rgb(' sb.Append('55,255,255)'>");
                sb.Append("												<div style='text-align:center'><span style='color:rgb(255,255,255);font-weight:bold'><br></span></div>");
                sb.Append("												<div style='text-align:center'><span style='color:rgb(255,255,255);font-weight:bold'>Smartway - SIR Notificaciones");
                sb.Append("                                             </span></div>");
                sb.Append("												<div style='text-align:center'><span style='color:rgb(255,255,255);font-weight:bold'><br></span></div>");
                sb.Append("												<span style='color:rgb(38,38,38)'></span>");
                sb.Append("											</td>");
                sb.Append("											</tr>");
                sb.Append("										</tbody>");
                sb.Append("									</table>");
                sb.Append("									</td>");
                sb.Append("									</tr>");
                sb.Append("									<tr>");
                sb.Append("									<td>");
                sb.Append("										<table width='100%' border='0' cellpadding='10' cellspacing='10' align='center'  bgcolor='white'>");
                sb.Append("										<tbody>");
                sb.Append("										       <tr>");
                sb.Append("												<td align='left' valign='top' style='padding:10px;font-family:Arial,Helvetica,sans-serif;color:rgb(38,38,38)");
                sb.Append("                                             font-size:12px;background-color:rgb(255,255,255);width:190px '  colspan='4'> ");
                sb.Append("													Sr(a). " + usuario.usr_str_nombre + ' ' + usuario.usr_str_apellidos + "");
                sb.Append("												</td>");
                sb.Append("											</tr>");
                sb.Append("											<tr>");
                sb.Append("												<td colspan='10' align='left' valign='top' style='padding:10px;font-family:Arial,Helvetica,sans-serif;color:rgb(38,38,38);");
                sb.Append("                                         font-size:12px;background-color:rgb(255,255,255);width:190px '  colspan='4'>");
                sb.Append("												   Se le informa que el usuario " + Usuario.NombreUsuario + " ha realizado una solicitud de respuesto para la reparación de la orden de servicio: " + modOrdenServicio.numeroordenservicio);
                sb.Append("												</td>");
                sb.Append("											</tr>");
                sb.Append("												<tr>");
                sb.Append("												<td colspan='10' align='left' valign='top' style='padding:10px;font-family:Arial,Helvetica,sans-serif;color:rgb(38,38,38);");
                sb.Append("                                             font-size:14px;font-weight:bold;background-color:rgb(255,255,255)'  colspan='4'>");
                sb.Append("													<span style='font-family:Arial,Helvetica,sans-serif;color:rgb(38,38,38)'>Se ha solicitado el siguiente respuesto.</span> ");
                sb.Append("");
                sb.Append("												</td>");
                sb.Append("											</tr>");
                sb.Append("											<tr>");
                sb.Append("												<td align='left' valign='top' style='padding:10px;font-family:Arial,Helvetica,sans-serif;color:rgb(38,38,38);");
                sb.Append("ont-size:12px;background-color:rgb(255,255,255);width:190px'>");
                sb.Append("													" + modRepuesto.codigoproducto);
                sb.Append("												</td>");
                sb.Append("												<td align='left' valign='top' style='padding:10px;font-family:Arial,Helvetica,sans-serif;color:rgb(38,38,38);");
                sb.Append("ont-size:12px;background-color:rgb(255,255,255);width:190px'>");
                sb.Append("												</td>");
                sb.Append("												<td align='left' valign='top' style='padding:10px;font-family:Arial,Helvetica,sans-serif;color:rgb(38,38,38);");
                sb.Append("ont-size:12px;background-color:rgb(255,255,255);width:190px'>");
                sb.Append("													" + modRepuesto.descripcionlarga);
                sb.Append("												</td>");
                //sb.Append("                                            < td align = 'left' valign = 'top' style = 'padding:10px;font-family:Arial,Helvetica,sans-serif;color:rgb(38,38,38);");
                //sb.Append("ont-size:12px;background-color:rgb(255,255,255);width:190px'>");
                //sb.Append("													" + existerepuesto == null ? "" : existerepuesto.serie);
                sb.Append("												</td>");
                sb.Append("											</tr>");
                sb.Append("									");
                sb.Append("											");
                sb.Append("										</tbody>");
                sb.Append("										");
                sb.Append("										</table>");
                sb.Append("									</td>");
                sb.Append("									</tr>");
                sb.Append("									<tr>");
                sb.Append("									<td>");
                sb.Append("										");
                sb.Append("						</tbody>");
                sb.Append("						</table>");
                sb.Append("					</td>");
                sb.Append("					</tr>");
                sb.Append("				</tbody>");
                sb.Append("			</table>");
                sb.Append("        </td>");
                sb.Append("    </tr>");
                sb.Append("</tbody>");
                sb.Append("</table>");
                #endregion

                bool correo = MailHelper.EnviarMail(usuario.usr_str_email, "[Se ha solicitado un repuesto de almacén]", sb.ToString(), true);

                
               if(existerepuesto == null)
                {

                }
                else if (existerepuesto.cantidad == 0)
                {
                   // NO se notifica
                }
                else
                {
                     existerepuesto.cantidad = existerepuesto.cantidad - 1;
                    if (existerepuesto.serie != null || existerepuesto.imei != null)
                    {
                        if (existerepuesto.serie != "" || existerepuesto.imei != "")
                            existerepuesto.idestado = (Int32)Constantes.Producto.NoDisponible;
                        else
                            existerepuesto.idestado = (Int32)Constantes.Producto.Disponible;
                    }
                    else
                    {
                        existerepuesto.idestado = (Int32)Constantes.Producto.Disponible;
                    }

                    existerepuesto.__idoperacion = 2;

                    new InventarioData().InsertarActualizarInventario(existerepuesto);
                }


                var diagnostico = new DiagnosticoData().listarDiagnostico(null, null, null, null, item.iddiagnostico).FirstOrDefault();

                var aux = new ReparacionData().listarReparacion(null
                    , null, item.idreparacion).ToList();


                var modReparacion = aux.Where(x => x.idreparacion.Value.Equals(item.idreparacion)).FirstOrDefault();

              
                    var modIncidencia = new IncidenciaData().ObtenerIncidencia(modOrdenServicio.idincidencia.Value);

                    modTarifa = new AgendamientoData().calcularTarifa(
                       modIncidencia.idtipoproducto
                       , modReparacion.idnivelreparacion
                       , modIncidencia.idpartner);


                TrabajoDetalleModel = new OrdenTrabajoDetalleModel();
                TrabajoDetalleModel.activo = true;
                TrabajoDetalleModel.costo = modRepuesto.costounitario;
                TrabajoDetalleModel.diagnostico = diagnostico.descripcion;
                TrabajoDetalleModel.reparacion = modReparacion.descripcion;
                TrabajoDetalleModel.repuesto = modRepuesto.descripcionlarga;
                TrabajoDetalleModel.iddiagnostico = item.iddiagnostico;
                TrabajoDetalleModel.idrepuesto = item.idproducto;
                TrabajoDetalleModel.idreparacion = item.idreparacion;
                TrabajoDetalleModel.costo = modRepuesto.costounitario;
                TrabajoDetalleModel.descripcion = "Repuesto";
                TrabajoDetalleModel.idordentrabajo = modOrdenServicio.idordentrabajo.Value;
                TrabajoDetalleModel.__idoperacion = 1;
                TrabajoDetalleModel.servicio = false;
                if(existerepuesto != null)
                TrabajoDetalleModel.idinventario = existerepuesto.idinventario;
                var asociado = new ReparacionesData().InsertarActualizarOrdenTrabajoDetalle(TrabajoDetalleModel);



                if (modTarifa != null)
                {

                    TrabajoDetalleModel = new OrdenTrabajoDetalleModel();
                    TrabajoDetalleModel.activo = true;
                    TrabajoDetalleModel.costo = modTarifa.costo.Value;
                    TrabajoDetalleModel.diagnostico = diagnostico.descripcion;
                    TrabajoDetalleModel.reparacion = modReparacion.nivelreparacion;
                    TrabajoDetalleModel.repuesto = "";
                    TrabajoDetalleModel.iddiagnostico = item.iddiagnostico;
                    TrabajoDetalleModel.idrepuesto = item.idrepuesto;
                    TrabajoDetalleModel.idreparacion = item.idreparacion;
                    TrabajoDetalleModel.descripcion = modReparacion.nivelreparacion;
                    TrabajoDetalleModel.idordentrabajo = modOrdenServicio.idordentrabajo.Value;
                    TrabajoDetalleModel.servicio = true;
                    TrabajoDetalleModel.idservicioasociado = asociado;
                    TrabajoDetalleModel.__idoperacion = 1;
                    new ReparacionesData().InsertarActualizarOrdenTrabajoDetalle(TrabajoDetalleModel);

                }
            }






         
          //  return Json(new { res = true });



            #endregion




            return Json(new { res = true });

        }
    }
}