﻿using QueryContracts.Smartway.Mantenimiento.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Caching;
using System.Web.Mvc;
using Web.Common.Controllers;
using Web.Smartway.Areas.Agendamiento.Models;
using Web.Smartway.Areas.Mantenimiento.Models;
using Web.Smartway.DataAccess;
using Web.Smartway.DataAccess.Mantenimiento;
using Web.Common.HtmlHelpers;
using Web.Common.Extensions;
using System.Configuration;
using Web.Smartway.DataAccess.Reparaciones;
using Web.Smartway.DataAccess.Seguridad;
using Web.Smartway.Areas.Seguridad.Models.Usuarios;
using Web.Smartway.DataAccess.Agendamiento;
using Web.Smartway.Areas.Despacho.Models;
using Web.Smartway.Areas.Reparacion.Models;
using Web.Smartway.DataAccess.Inventario;
using Web.Smartway.Areas.Inventario.Models;
using QueryContracts.Smartway.Reparacion.Results;
using System.Text;

namespace Web.Smartway.Areas.Reparacion.Controllers
{
    public class ReparacionController : BaseController
    {

        #region ActionResult 
        public ActionResult PanelTrabajoTecnico()
        {

            var estado = MantenimientoData.GetListarEstado((Int32)Constantes.MaestroTablas.OrdenServicio);
            var listadoestado = new SelectList(estado, "idestado", "estado");
            ViewData["listadoestado"] = listadoestado;

            return View();
        }
        public ActionResult SeguimientoReparaciones()
        {
            var estado = MantenimientoData.GetListarEstado((Int32)Constantes.MaestroTablas.OrdenServicio);
            var listadoestado = new SelectList(estado, "idestado", "estado");
            ViewData["listadoestado"] = listadoestado;


            return View();
        }
        public ActionResult RepararOrden(long id, string Sup="0")
        {
            Session["ReparacionDetalle"] = null;
            IncidenciaModel modIncidencia = null;
            OrdenTrabajoModel modOrdentrabajo = new OrdenTrabajoModel();
            OrdenServicioModel modOrdenServicio = new OrdenServicioModel();

            ViewBag.Sup = Sup;

            if (Sup == "1")
            {
                modOrdenServicio = new OrdenServicioData().obtenerOrdenServicio(id);
                modOrdentrabajo = new ReparacionesData().obtenerOrdenTrabajo(modOrdenServicio.idordentrabajo.Value);
            }
            else
            {
                modOrdentrabajo = new ReparacionesData().obtenerOrdenTrabajo(id);
                modOrdenServicio = new OrdenServicioData().obtenerOrdenServicio(modOrdentrabajo.idordenserviciotecnico.Value);
            }


            var modListadoTiempo = new ReparacionesData().GetListarOrdenTrabajoTiempo(modOrdentrabajo.idordentrabajo.Value).ToList();

            modOrdentrabajo.inicios = new List<DateTime?>();
            modOrdentrabajo.fines = new List<DateTime?>();


            for (int i = 0; i < modListadoTiempo.Count(); i++)
            {
                modOrdentrabajo.inicios.Add(modListadoTiempo[i].fechahorainicio);
                modOrdentrabajo.fines.Add(modListadoTiempo[i].fechahorafin);


                if (i == 0)
                {
                    modOrdentrabajo.lapse1_fin = modListadoTiempo[0].fechahorafin;
                    modOrdentrabajo.lapse1_inicio = modListadoTiempo[0].fechahorainicio;
                }
                else if (i == 1)
                {
                    modOrdentrabajo.lapse2_fin = modListadoTiempo[1].fechahorafin;
                    modOrdentrabajo.lapse2_inicio = modListadoTiempo[1].fechahorainicio;
                }
                else if (i == 2)
                {
                    modOrdentrabajo.lapse3_fin = modListadoTiempo[2].fechahorafin;
                    modOrdentrabajo.lapse3_inicio = modListadoTiempo[2].fechahorainicio;
                }
                else if (i == 3)
                {
                    modOrdentrabajo.lapse4_fin = modListadoTiempo[3].fechahorafin;
                    modOrdentrabajo.lapse4_inicio = modListadoTiempo[3].fechahorainicio;
                }
                else if (i == 4)
                {
                    modOrdentrabajo.lapse5_fin = modListadoTiempo[4].fechahorafin;
                    modOrdentrabajo.lapse5_inicio = modListadoTiempo[4].fechahorainicio;
                }
                else if (i == 5)
                {
                    modOrdentrabajo.lapse6_fin = modListadoTiempo[5].fechahorafin;
                    modOrdentrabajo.lapse6_inicio = modListadoTiempo[5].fechahorainicio;
                }
                else if (i == 6)
                {
                    modOrdentrabajo.lapse7_fin = modListadoTiempo[6].fechahorafin;
                    modOrdentrabajo.lapse7_inicio = modListadoTiempo[6].fechahorainicio;
                }
                else if (i == 7)
                {
                    modOrdentrabajo.lapse8_fin = modListadoTiempo[7].fechahorafin;
                    modOrdentrabajo.lapse8_inicio = modListadoTiempo[7].fechahorainicio;
                }
                else if (i == 8)
                {
                    modOrdentrabajo.lapse9_fin = modListadoTiempo[8].fechahorafin;
                    modOrdentrabajo.lapse9_inicio = modListadoTiempo[8].fechahorainicio;
                }
                else if (i == 9)
                {
                    modOrdentrabajo.lapse10_fin = modListadoTiempo[9].fechahorafin;
                    modOrdentrabajo.lapse10_inicio = modListadoTiempo[9].fechahorainicio;
                }


            } 


            if (modOrdenServicio.idtipoordenservicio !=  (Int32)Constantes.tipoordenservicio.osp &&
                modOrdenServicio.idtipoordenservicio != (Int32)Constantes.tipoordenservicio.osr)
            {
                modIncidencia = new IncidenciaData().ObtenerIncidencia(modOrdenServicio.idincidencia.Value);
                modOrdentrabajo.idincidencia = modIncidencia.idincidencia.Value;
                modOrdentrabajo.numeroincidencia = modIncidencia.numeroincidencia;
                modOrdentrabajo.anioincidencia = modIncidencia.anioincidencia;
                modOrdentrabajo.producto = modIncidencia.producto;
                modOrdentrabajo.codigoproducto = modIncidencia.codigoproducto;
                modOrdentrabajo.imei = modIncidencia.imei;
                modOrdentrabajo.serie = modIncidencia.serie;
                modOrdentrabajo.idtipoproducto = modIncidencia.idtipoproducto;
                modOrdentrabajo.idproducto = modIncidencia.idproducto;
            }
            else
            {
                var producto = new ProductoData().obtenerProducto(modOrdenServicio.idproducto);
                modOrdentrabajo.producto = producto.descripcionlarga;
                modOrdentrabajo.codigoproducto = producto.codigoproducto;
                modOrdentrabajo.idtipoproducto = producto.idtipoproducto.Value;
                modOrdentrabajo.imei = modOrdentrabajo.imei;
                modOrdentrabajo.serie = modOrdentrabajo.serie;
                modOrdentrabajo.idproducto = producto.idproducto.Value;
            }
                 
           
            modOrdentrabajo.numeroordentrabajo = modOrdenServicio.numeroost;

            if(modOrdenServicio.fechahorainicio != null)
            modOrdentrabajo.tiempotranscurrido = DateTime.Now - modOrdenServicio.fechahorainicio.Value;
            if(modListadoTiempo.Count > 0 )
            modOrdentrabajo.tiempotrabajo = modListadoTiempo.FirstOrDefault().fechahorainicio.Value;

            modOrdentrabajo.tecnico = modOrdenServicio.tecnicoAsignado;
            modOrdentrabajo.idtipoordenservicio = modOrdenServicio.idtipoordenservicio;
            
            modOrdentrabajo.idordenserviciotecnico = modOrdenServicio.idordenserviciotecnico.Value;
            modOrdentrabajo.idordentrabajo = modOrdenServicio.idordentrabajo;
            modOrdentrabajo.fechahorainicio = modOrdenServicio.fechahorainicio;
            modOrdentrabajo.numeroordenservicio = modOrdenServicio.numeroordenservicio;

            var listadoTotal = ReparacionesData.GetListarOrdenTrabajoDetalle(modOrdentrabajo.idordentrabajo).ToList();
            if (modOrdenServicio.cotizado.Value)
                modOrdentrabajo.cotizado = true;
            else
                modOrdentrabajo.cotizado = false; ;


            Session["ReparacionDetalle"] = listadoTotal;

            #region combos

            var sucursal = new SucursalData().ListarSucursal("", "", null);
            var listasucursal = new SelectList(
               sucursal,
               "idsucursal",
               "nombre");
            ViewData["listasucursal"] = listasucursal;


            var diagnostico = new DiagnosticoData().listarDiagnostico(null, null, 3, true);
            var listadiagnostico = new SelectList(diagnostico, "iddiagnostico", "descripcion");
            ViewData["listadiagnostico"] = listadiagnostico;

            #endregion

            return View(modOrdentrabajo);
        }
        public ActionResult ControlCalidad()
        {
            var estado = MantenimientoData.GetListarEstado((Int32)Constantes.MaestroTablas.OrdenServicio);
            var listadoestado = new SelectList(estado, "idestado", "estado");
            ViewData["listadoestado"] = listadoestado;

            return View();
        }

        #endregion

        [HttpPost]
        public JsonResult JsonGetListarReparaciones(int? idestado, string fechainicio, string fechafin,string numeroordenservicio, int? idtecnico, string serie)
        {

            if (fechafin == "")
                fechafin = null;
            if (fechainicio == "")
                fechainicio = null;
            if (numeroordenservicio == "")
                numeroordenservicio = null;
            if (serie == "")
                serie = null;

            var usuario = UsuariosData.ObtenerUsuario(Usuario.Idusuario);


            var listadoTotal = ReparacionesData.GetListarReparaciones(idestado, fechainicio, fechafin, numeroordenservicio, idtecnico, serie).ToList();
            List<OrdenServicioModel> listadofinal = new List<OrdenServicioModel>();
            
            foreach (var item in usuario.tiposproducto.Split(','))
            {
                var retiro = listadoTotal.Where(x => x.idtipoproducto == Convert.ToInt32(item)).ToList();
                if(retiro.Count > 0)
                {
                    listadofinal.AddRange(retiro);
                }
            }

            var resjson1 = (new JqGridExtension<OrdenServicioModel>()).DataBind(listadofinal, listadofinal.Count);
            return resjson1;
        }
        [HttpPost]
        public JsonResult JsonGetListarReparacionesTecnico( string fechainicio, string fechafin, string numeroot,string serie)
        {

            if (fechafin == "")
                fechafin = null;
            if (fechainicio == "")
                fechainicio = null;
            if (numeroot == "")
                numeroot = null;
            if (serie == "")
                serie = null;

            int idtecnico = Usuario.Idusuario;

            var usuario = UsuariosData.ObtenerUsuario(Usuario.Idusuario);

            var listadoTotal = ReparacionesData.GetListarReparaciones(null, fechainicio, fechafin, numeroot, idtecnico, serie  ).ToList();

            List<OrdenServicioModel> listadofinal = new List<OrdenServicioModel>();
            foreach (var item in usuario.tiposproducto.Split(','))
            {
                var retiro = listadoTotal.Where(x => x.idtipoproducto == Convert.ToInt32(item)).ToList();
                if (retiro.Count > 0)
                {
                    listadofinal.AddRange(retiro);
                }
            }
            var resjson1 = (new JqGridExtension<OrdenServicioModel>()).DataBind(listadofinal, listadofinal.Count);
            return resjson1;
        }
       
        public PartialViewResult AsignarTecnicoModal(int id)
        {
            var modOrdenServicio = new OrdenServicioModel();
            modOrdenServicio.idordenserviciotecnico = id;

            var mod = new ListarUsuariosModel();
            mod.IdRol = 15;

            var usuarios =   UsuariosData.GetListarUsuarios(mod).ToList();
            usuarios.ForEach(x =>
                      x.usr_str_nombre = x.usr_str_nombre + ' ' + x.usr_str_apellidos
                      );
            
            
            var listausuarios = new SelectList(usuarios, "usr_int_id", "usr_str_nombre");
            ViewData["listadotecnicos"] = listausuarios;

            return PartialView("_AsignarTecnico", modOrdenServicio);
        }
        [HttpPost]
        public JsonResult AsignarTecnico(long id, int idtecnico)
        {
            var modOrdenServicio = new OrdenServicioData().obtenerOrdenServicio(id);


            if (modOrdenServicio.idtipoproducto == (int)Constantes.TipoProducto.POS || modOrdenServicio.idtipoproducto == (int)Constantes.TipoProducto.PLACAPRINCIPAL)
            {
                modOrdenServicio.idestado = (Int32)Constantes.EstadoOrdenServicio.PendienteInicioReparacion;
            }
            else
            {
                if (modOrdenServicio.engarantia)
                    modOrdenServicio.idestado = (Int32)Constantes.EstadoOrdenServicio.PendienteInicioReparacion;
                else
                    modOrdenServicio.idestado = (Int32)Constantes.EstadoOrdenServicio.PendienteCotizacion;
            }





            //modOrdenServicio.idtecnico = idtecnico;
            modOrdenServicio.__tipooperacion = 2; //asignar Tecnico
            new OrdenServicioData().InsertarActualizarOrdenServicio(modOrdenServicio);



            var modOrdenTrabajo = new OrdenTrabajoModel();
            modOrdenTrabajo.idtecnico = idtecnico;
            modOrdenTrabajo.idusuarioregistro = Usuario.Idusuario;
            modOrdenTrabajo.numeroordentrabajo = "";
            modOrdenTrabajo.fechahoraregistro = DateTime.Now;
            modOrdenTrabajo.idestado = (Int32) Constantes.EstadoOrdenTrabajo.Asignada;
            modOrdenTrabajo.__tipooperacion = 1;
            modOrdenTrabajo.idordenserviciotecnico = id;


            new ReparacionesData().InsertarActualizarOrdenTrabajo(modOrdenTrabajo);

            return Json(new { res = true });
        }
    


        [HttpPost]
        public JsonResult AgregarReparacion(int? iddiagnostico
              , int? idreparacion
              , int? idrepuesto
              , long? idordenservicio, long idottiempo, long idordentrabajo)
        {


            TarifaModel modTarifa;
            AlmacenModel modAlmacen;
            OrdenTrabajoDetalleModel TrabajoDetalleModel = new OrdenTrabajoDetalleModel();
            var modOrdenServicio = new OrdenServicioData().obtenerOrdenServicio(idordenservicio.Value);
            
            var detalleReparacion = ReparacionesData.GetListarOrdenTrabajoDetalle(modOrdenServicio.idordentrabajo).ToList();

            var modRepuesto = new ProductoData().obtenerProducto(idrepuesto.Value);

            foreach (var item in detalleReparacion)
            {
                if(modRepuesto.unico_reparacion)
                   if(item.idrepuesto == idrepuesto)
                        return Json(new { res = false, msj = "Este repuesto ya fue agregado" });
            }


            if (modOrdenServicio.idtipoproducto == (Int32)Constantes.TipoProducto.POS || modOrdenServicio.idtipoproducto == (Int32)Constantes.TipoProducto.PLACAPRINCIPAL)
                modAlmacen = new InventarioData().obtenerAlmacen(Constantes.CodAlmacen.Pos_Repuestos);
            else if (modOrdenServicio.idtipoproducto == (Int32)Constantes.TipoProducto.CELULAR)
                modAlmacen = new InventarioData().obtenerAlmacen(Constantes.CodAlmacen.Telecom_Repuestos);
            else
                modAlmacen = new InventarioData().obtenerAlmacen(Constantes.CodAlmacen.Telecom_Repuestos);


            var usuario = UsuariosData.ObtenerUsuario(16);

            

            var existerepuesto = new InventarioData().obtenerInventario(modAlmacen.idalmacen.Value, idrepuesto.Value, 45);

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

            if (existerepuesto == null)
            {
                var model = new OrdenTrabajoTiempoModel();
                model.fechahorafin = DateTime.Now;
                model.idordentrabajotiempo = idottiempo;
                model.__tipoperacion = 2;
                new ReparacionesData().insertarIniciarReparacion(model);


                var modOrdenTrabajo = new ReparacionesData().obtenerOrdenTrabajo(idordentrabajo);
                modOrdenTrabajo.idestado = (Int32)Constantes.EstadoOrdenTrabajo.Detenida;
                modOrdenTrabajo.__tipooperacion = 2;
                new ReparacionesData().InsertarActualizarOrdenTrabajo(modOrdenTrabajo);

                return Json(new { res = false, msj = "No existe este repuesto disponible. Se ha enviado una solicitud a almacén. Y se ha pausado la Orden de Trabajo." });
            }
            else if(existerepuesto.cantidad == 0)
            {
                if (existerepuesto.cantidad == 0)
                    return Json(new { res = false , msj = "No existe este repuesto disponible. Se ha enviado una solicitud a almacén." });
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

            
            var diagnostico = new DiagnosticoData().listarDiagnostico(null, null, null, null, iddiagnostico).FirstOrDefault();
            var aux = new ReparacionData().listarReparacion(null
                , null, idreparacion.Value).ToList();
            var modReparacion = aux.Where(x => x.idreparacion.Value.Equals(idreparacion)).FirstOrDefault();

            if (modOrdenServicio.idtipoordenservicio != (Int32) Constantes.tipoordenservicio.osr &&
                modOrdenServicio.idtipoordenservicio != (Int32) Constantes.tipoordenservicio.osp)
            {
                var modIncidencia = new IncidenciaData().ObtenerIncidencia(modOrdenServicio.idincidencia.Value);

                modTarifa = new AgendamientoData().calcularTarifa(
                   modIncidencia.idtipoproducto
                   , modReparacion.idnivelreparacion
                   , modIncidencia.idpartner);
            }
            else
            {
                modTarifa = new AgendamientoData().calcularTarifa(
                modOrdenServicio.idtipoproducto
                , modReparacion.idnivelreparacion
                , modOrdenServicio.idpartner);
            }

            TrabajoDetalleModel.activo = true;
            TrabajoDetalleModel.costo = modRepuesto.costounitario;
            TrabajoDetalleModel.diagnostico = diagnostico.descripcion;
            TrabajoDetalleModel.reparacion= modReparacion.descripcion;
            TrabajoDetalleModel.repuesto = modRepuesto.descripcionlarga;
            TrabajoDetalleModel.iddiagnostico = iddiagnostico.Value;
            TrabajoDetalleModel.idrepuesto = idrepuesto.Value;
            TrabajoDetalleModel.idreparacion = idreparacion.Value;
            TrabajoDetalleModel.costo = modRepuesto.costounitario;
            TrabajoDetalleModel.descripcion = "Repuesto";
            TrabajoDetalleModel.idordentrabajo = modOrdenServicio.idordentrabajo.Value;
            TrabajoDetalleModel.__idoperacion = 1;
            TrabajoDetalleModel.servicio = false;
            TrabajoDetalleModel.idinventario = existerepuesto.idinventario;
            var nivelreparacion = "";
            if (modOrdenServicio.idtipoproducto != (int)Constantes.TipoProducto.CELULAR)
            {
                nivelreparacion = modReparacion.nivelreparacionPOS;
                TrabajoDetalleModel.idnivelreparacion = nivelreparacion;
            }
            else
            {
                nivelreparacion = modReparacion.nivelreparacionTELECOM;
                TrabajoDetalleModel.idnivelreparacion = nivelreparacion;
            }


            var asociado = new ReparacionesData().InsertarActualizarOrdenTrabajoDetalle(TrabajoDetalleModel);



            if (modReparacion != null)
            {
                TrabajoDetalleModel = new OrdenTrabajoDetalleModel();
                if (modTarifa != null)
                    TrabajoDetalleModel.costo = modTarifa.costo.Value;
               
                TrabajoDetalleModel.activo = true;
                TrabajoDetalleModel.diagnostico = diagnostico.descripcion;
                TrabajoDetalleModel.reparacion = modReparacion.nivelreparacion;
                TrabajoDetalleModel.repuesto = "";
                TrabajoDetalleModel.iddiagnostico = iddiagnostico.Value;
                TrabajoDetalleModel.idrepuesto = idrepuesto.Value;
                TrabajoDetalleModel.idreparacion = idreparacion.Value;
                TrabajoDetalleModel.descripcion = modReparacion.nivelreparacion;
                TrabajoDetalleModel.idordentrabajo = modOrdenServicio.idordentrabajo.Value;
                TrabajoDetalleModel.servicio = true;
                TrabajoDetalleModel.idservicioasociado = asociado;
                TrabajoDetalleModel.__idoperacion = 1;
                TrabajoDetalleModel.idnivelreparacion = nivelreparacion;
                new ReparacionesData().InsertarActualizarOrdenTrabajoDetalle(TrabajoDetalleModel);

            }
            return Json(new { res = true });

        }
        public JsonResult JsonEliminarReparacionDetalle(int item, long idinventario, int idrepuesto)
        {



            var usuario = UsuariosData.ObtenerUsuario(16);

            OrdenTrabajoDetalleModel TrabajoDetalleModel = new OrdenTrabajoDetalleModel();
            TrabajoDetalleModel.idordentrabajodetalle = item;
            TrabajoDetalleModel.activo = false;
            TrabajoDetalleModel.__idoperacion = 2;
            new ReparacionesData().InsertarActualizarOrdenTrabajoDetalle(TrabajoDetalleModel);


            var modRepuesto = new ProductoData().obtenerProducto(idrepuesto);

    

            #region Retorna valor a almacen 
            var almacen = new InventarioData().obtenerAlmacen(Constantes.CodAlmacen.Telecom_Repuestos);
            var existerepuesto = new InventarioData().obtenerInventario(idinventario, null);




            if (existerepuesto.serie != null || existerepuesto.imei != null)
                existerepuesto.idestado = (Int32)Constantes.Producto.Disponible;

            existerepuesto.__idoperacion = 2;

            existerepuesto.cantidad = existerepuesto.cantidad + 1;
            existerepuesto.__idoperacion = 2;
            new InventarioData().InsertarActualizarInventario(existerepuesto);

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
            sb.Append("												   Se le informa que el usuario " + Usuario.NombreUsuario + " ha realizado el retorno del respuesto solicitado");
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
            bool correo = MailHelper.EnviarMail(usuario.usr_str_email, "[Se retorna un repuesto a almacén]", sb.ToString(), true);
            #endregion
            return Json(new { res = true });
        }
        public JsonResult JsonGetListarDetalleReparacion(long? idordentrabajo, string sord
            , int page
            , int rows)
        {
             var listadoTotal = ReparacionesData.GetListarOrdenTrabajoDetalle(idordentrabajo).ToList();
            if (listadoTotal.Count  == 0)
                listadoTotal = (List<OrdenTrabajoDetalleModel>)Session["ReparacionDetalle"];
            var resjson1 = (new JqGridExtension<OrdenTrabajoDetalleModel>()).DataBind(listadoTotal, listadoTotal.Count);
            return resjson1;
        }
        [HttpPost]
        public JsonResult FinalizarReparacion(long id, long idottiempo, string descripcion, string informetecnico)
        {
            var model = new OrdenTrabajoTiempoModel();
            var modOrdenTrabajo = new ReparacionesData().obtenerOrdenTrabajo(id);
            var modOrdenServicio = new OrdenServicioData().obtenerOrdenServicio(modOrdenTrabajo.idordenserviciotecnico.Value);

            model.fechahorafin = DateTime.Now;
            model.idordentrabajotiempo = idottiempo;
            model.__tipoperacion = 2;
            new ReparacionesData().insertarIniciarReparacion(model);

         
            modOrdenServicio.idestado = (Int32)Constantes.EstadoOrdenServicio.PendienteProcesoQC;
          

            
            modOrdenServicio.__tipooperacion = 2;
            new OrdenServicioData().InsertarActualizarOrdenServicio(modOrdenServicio);



            modOrdenTrabajo.idordentrabajo = id;
            modOrdenTrabajo.idestado = (Int32)Constantes.EstadoOrdenTrabajo.Completada;
            modOrdenTrabajo.__tipooperacion = 2;
            modOrdenTrabajo.descripcion = descripcion;
            modOrdenTrabajo.informetecnico = informetecnico;

            var idordentrabajo = new ReparacionesData().InsertarActualizarOrdenTrabajo(modOrdenTrabajo);

            
            return Json(new { res = true });
        }
        [HttpPost]
        public JsonResult NoReparable(long id, long idottiempo, string descripcion, string informetecnico)
        {
            var model = new OrdenTrabajoTiempoModel();
            var modOrdenTrabajo = new ReparacionesData().obtenerOrdenTrabajo(id);
            var modOrdenServicio = new OrdenServicioData().obtenerOrdenServicio(modOrdenTrabajo.idordenserviciotecnico.Value);

            model.fechahorafin = DateTime.Now;
            model.idordentrabajotiempo = idottiempo;
            model.__tipoperacion = 2;
            new ReparacionesData().insertarIniciarReparacion(model);


            modOrdenServicio.idestado = (Int32)Constantes.EstadoOrdenServicio.PendienteDespachoCliente;
            modOrdenServicio.__tipooperacion = 2;
            new OrdenServicioData().InsertarActualizarOrdenServicio(modOrdenServicio);

            modOrdenTrabajo.idordentrabajo = id;
            modOrdenTrabajo.idestado = (Int32)Constantes.EstadoOrdenTrabajo.Completada;
            modOrdenTrabajo.__tipooperacion = 2;
            modOrdenTrabajo.descripcion = descripcion;
            modOrdenTrabajo.informetecnico = informetecnico;

            var idordentrabajo = new ReparacionesData().InsertarActualizarOrdenTrabajo(modOrdenTrabajo);

            var modInventario = new InventarioData().obtenerInventario(modOrdenServicio.idinventario, null);
            modInventario.__idoperacion = 4;
            modInventario.idestado = (int)Constantes.Producto.Inoperativo;

            new InventarioData().InsertarActualizarInventario(modInventario);

            return Json(new { res = true });
        }
        [HttpPost]
        public JsonResult PierdeGarantia(long id, long idottiempo, string descripcion, string informetecnico)
        {
            var model = new OrdenTrabajoTiempoModel();
            var modOrdenTrabajo = new ReparacionesData().obtenerOrdenTrabajo(id);
            var modOrdenServicio = new OrdenServicioData().obtenerOrdenServicio(modOrdenTrabajo.idordenserviciotecnico.Value);

            model.fechahorafin = DateTime.Now;
            model.idordentrabajotiempo = idottiempo;
            model.__tipoperacion = 2;
            new ReparacionesData().insertarIniciarReparacion(model);


            modOrdenServicio.idestado = (Int32)Constantes.EstadoOrdenServicio.PendienteCotizacion;
            modOrdenServicio.__tipooperacion = 3;
            modOrdenServicio.cotizado = false;
            modOrdenServicio.engarantia = false;

            new OrdenServicioData().InsertarActualizarOrdenServicio(modOrdenServicio);

            modOrdenTrabajo.idordentrabajo = id;
            modOrdenTrabajo.idestado = (Int32)Constantes.EstadoOrdenTrabajo.Asignada;
            modOrdenTrabajo.__tipooperacion = 2;
            modOrdenTrabajo.descripcion = descripcion;
            modOrdenTrabajo.informetecnico = informetecnico;

            var idordentrabajo = new ReparacionesData().InsertarActualizarOrdenTrabajo(modOrdenTrabajo);

            var modInventario = new InventarioData().obtenerInventario(modOrdenServicio.idinventario, null);
            modInventario.__idoperacion = 4;
            modInventario.idestado = (int)Constantes.Producto.PendienteReparar;

            new InventarioData().InsertarActualizarInventario(modInventario);

            return Json(new { res = true });
        }
        [HttpPost]
        public JsonResult JsonPausarReparacion(long id, long idottiempo, string descripcion, string informetecnico)
        {
            var model = new OrdenTrabajoTiempoModel();
            model.fechahorafin = DateTime.Now;
            model.idordentrabajotiempo = idottiempo;
            model.__tipoperacion = 2; 
            new ReparacionesData().insertarIniciarReparacion(model);


            var modOrdenTrabajo = new ReparacionesData().obtenerOrdenTrabajo(id);
            modOrdenTrabajo.idestado = (Int32)Constantes.EstadoOrdenTrabajo.Detenida;
            modOrdenTrabajo.__tipooperacion = 2;
            modOrdenTrabajo.descripcion = descripcion;
            modOrdenTrabajo.informetecnico = informetecnico;
            new ReparacionesData().InsertarActualizarOrdenTrabajo(modOrdenTrabajo);

            return Json(new { res = true });
        }

        [HttpPost]
        public JsonResult JsonIniciarReparacion(long id)
        {
            var modOrdenTrabajo = new ReparacionesData().obtenerOrdenTrabajo(id);
            var modOrdenServicio = new OrdenServicioData().obtenerOrdenServicio(modOrdenTrabajo.idordenserviciotecnico.Value);

            if (modOrdenServicio.idtipoproducto == (int)Constantes.TipoProducto.POS || modOrdenServicio.idtipoproducto == (Int32)Constantes.TipoProducto.PLACAPRINCIPAL)
            {


                modOrdenTrabajo.idestado = (Int32)Constantes.EstadoOrdenTrabajo.EnAtencion;
                modOrdenServicio.idestado = (Int32)Constantes.EstadoOrdenServicio.EnProcesoReparacion;
            }
            else
            {

                if (!modOrdenServicio.engarantia)
                {
                    if (modOrdenServicio.cotizado.HasValue)
                    {
                        if (modOrdenServicio.cotizado.Value)
                        {
                            modOrdenTrabajo.idestado = (Int32)Constantes.EstadoOrdenTrabajo.EnAtencion;
                            modOrdenServicio.idestado = (Int32)Constantes.EstadoOrdenServicio.PendienteInicioReparacion;
                        }
                        else
                        {
                            modOrdenTrabajo.idestado = (Int32)Constantes.EstadoOrdenTrabajo.EnCotizacion;
                            modOrdenServicio.idestado = (Int32)Constantes.EstadoOrdenServicio.PendienteCotizacion; // Continúa en el mismo estado
                        }
                    }
                }
                else
                {
                    modOrdenTrabajo.idestado = (Int32)Constantes.EstadoOrdenTrabajo.EnAtencion;
                    modOrdenServicio.idestado = (Int32)Constantes.EstadoOrdenServicio.EnProcesoReparacion;
                }
            }


            modOrdenServicio.__tipooperacion = 2;
            new OrdenServicioData().InsertarActualizarOrdenServicio(modOrdenServicio);
            modOrdenTrabajo.idordentrabajo = id;
            modOrdenTrabajo.__tipooperacion = 2;
            new ReparacionesData().InsertarActualizarOrdenTrabajo(modOrdenTrabajo);

            if (modOrdenServicio.idtipoproducto != (int)Constantes.TipoProducto.POS || modOrdenServicio.idtipoproducto == (Int32)Constantes.TipoProducto.PLACAPRINCIPAL)
            {
                if (!modOrdenServicio.engarantia)
                {
                    if (modOrdenServicio.cotizado.HasValue)
                    {
                        if (modOrdenServicio.cotizado.Value)
                        {
                            var model = new OrdenTrabajoTiempoModel();
                            model.idordentrabajo = id;
                            model.idusuario = Usuario.Idusuario;
                            model.fechahorainicio = DateTime.Now;
                            model.iteracion = modOrdenTrabajo.bounce;
                            model.__tipoperacion = 1;
                            long idottiempo = new ReparacionesData().insertarIniciarReparacion(model);
                        }
                        else
                        {
                            var model = new OrdenTrabajoTiempoModel();
                            model.idordentrabajo = id;
                            model.idusuario = Usuario.Idusuario;
                            model.fechahorainicio = DateTime.Now;
                            model.iteracion = modOrdenTrabajo.bounce;
                            model.__tipoperacion = 1;
                            long idottiempo = new ReparacionesData().insertarIniciarReparacion(model);
                        }
                    }
                    
                }
                else
                {
                    var model = new OrdenTrabajoTiempoModel();
                    model.idordentrabajo = id;
                    model.idusuario = Usuario.Idusuario;
                    model.fechahorainicio = DateTime.Now;
                    model.iteracion = modOrdenTrabajo.bounce;
                    model.__tipoperacion = 1;
                    long idottiempo = new ReparacionesData().insertarIniciarReparacion(model);
                }
            }
            else
            {
                var model = new OrdenTrabajoTiempoModel();
                model.idordentrabajo = id;
                model.idusuario = Usuario.Idusuario;
                model.fechahorainicio = DateTime.Now;
                model.iteracion = modOrdenTrabajo.bounce;
                model.__tipoperacion = 1;
                long idottiempo = new ReparacionesData().insertarIniciarReparacion(model);
            }

         

            return Json(new { res = true, modOrdenServicio.cotizado, modOrdenServicio.engarantia , modOrdenServicio.idtipoproducto });
        }
      

        #region QC
        public PartialViewResult AprobarQCModal(long idordenservicio)
        {
            var modOrdenServicio = new OrdenServicioData().obtenerOrdenServicio(idordenservicio);
            if (modOrdenServicio.idtipoproducto == (Int32)Constantes.TipoProducto.CELULAR || modOrdenServicio.idtipoproducto == (Int32)Constantes.TipoProducto.PLACAPRINCIPAL)
            {
                return PartialView("_AprobarQCTelecom", modOrdenServicio);
            }
            else
            {
                return PartialView("_AprobarQCPos", modOrdenServicio);
            }
        }
      
        [HttpPost]
        public JsonResult JsonAprobarQC(long idordenservicio, bool aprobado)
        {
            var modOrdenServicio = new OrdenServicioData().obtenerOrdenServicio(idordenservicio);
            var modOrdenTrabajo = new ReparacionesData().obtenerOrdenTrabajo(modOrdenServicio.idordentrabajo.Value);
            var modInventario = new InventarioData().obtenerInventario(modOrdenServicio.idinventario , null);

            if (aprobado)
            {
                modOrdenServicio.idestado = (Int32)Constantes.EstadoOrdenServicio.PendienteDespachoCliente;
                modInventario.idestado = (int)Constantes.Producto.Reparado;
                new InventarioData().InsertarActualizarInventario(modInventario);
            }
            else
            {
                modOrdenServicio.idestado = (Int32)Constantes.EstadoOrdenServicio.PendienteInicioReparacion;
                modOrdenTrabajo.idestado = (Int32)Constantes.EstadoOrdenTrabajo.Reasignada;
                modOrdenTrabajo.bounce = modOrdenTrabajo.bounce + 1;
            }

            modOrdenServicio.__tipooperacion = 2;
            modOrdenTrabajo.__tipooperacion = 2;
      


       




          
            new ReparacionesData().InsertarActualizarOrdenTrabajo(modOrdenTrabajo);
            new OrdenServicioData().InsertarActualizarOrdenServicio(modOrdenServicio);


            return Json(new { res = true });
        }
        [HttpPost]
        public JsonResult JsonGetListarReparacionesQC(int? idestado, string fechainicio, string fechafin, string numeroordenservicio, int? idtecnico, string serie)
        {

            if (fechafin == "")
                fechafin = null;
            if (fechainicio == "")
                fechainicio = null;
            if (numeroordenservicio == "")
                numeroordenservicio = null;
            if (serie == "")
                serie = null;

            var listadoTotal = ReparacionesData.GetListarReparaciones((Int32) Constantes.EstadoOrdenServicio.PendienteProcesoQC, fechainicio, fechafin, numeroordenservicio, idtecnico, serie).ToList();
            var resjson1 = (new JqGridExtension<OrdenServicioModel>()).DataBind(listadoTotal, listadoTotal.Count);
            return resjson1;
        }

        [HttpPost]
        public JsonResult RevisarAprobacion(OrdenServicioModel model, FormCollection collection)
        {
            var modOrdenServicio = new OrdenServicioData().obtenerOrdenServicio(model.idordenserviciotecnico.Value);
            var modOrdenTrabajo = new ReparacionesData().obtenerOrdenTrabajo(modOrdenServicio.idordentrabajo.Value);
            var modInventario = new InventarioData().obtenerInventario(modOrdenServicio.idinventario, null);

            string condicion11 = string.Empty, condicion12 = string.Empty, condicion13 = string.Empty, condicion14 = string.Empty; 

            var condicion1 = collection["chkCondicion1"].ToString();
            var condicion2 = collection["chkCondicion2"].ToString();
            var condicion3 = collection["chkCondicion3"].ToString();
            var condicion4 = collection["chkCondicion4"].ToString();
            var condicion5 = collection["chkCondicion5"].ToString();
            var condicion6 = collection["chkCondicion6"].ToString();
            var condicion7 = collection["chkCondicion7"].ToString();
            var condicion8 = collection["chkCondicion8"].ToString();
            var condicion9 = collection["chkCondicion9"].ToString();
            var condicion10 = collection["chkCondicion10"].ToString();

            if (modOrdenServicio.idtipoproducto == (Int32)Constantes.TipoProducto.CELULAR || modOrdenServicio.idtipoproducto == (Int32)Constantes.TipoProducto.PLACAPRINCIPAL)
            {
                 condicion11 = collection["chkCondicion11"].ToString();
                 condicion12 = collection["chkCondicion12"].ToString();
                 condicion13 = collection["chkCondicion13"].ToString();
                 condicion14 = collection["chkCondicion14"].ToString();
                if (condicion1 == "true" && condicion2 == "true"
                 && condicion3 == "true"
                 && condicion4 == "true"
                 && condicion5 == "true"
                 && condicion6 == "true"
                 && condicion7 == "true"
                 && condicion8 == "true"
                 && condicion9 == "true"
                 && condicion10 == "true"
                 && condicion11 == "true"
                 && condicion12 == "true"
                 && condicion13 == "true"
                 )
                {
                    if (modOrdenServicio.delivery)
                        modOrdenServicio.idestado = (Int32)Constantes.EstadoOrdenServicio.PendienteDespachoCliente;
                    else
                        modOrdenServicio.idestado = (Int32)Constantes.EstadoOrdenServicio.PendienteEntregaCliente;

                    modInventario.idestado = (int)Constantes.Producto.Reparado;
                    modInventario.__idoperacion = 5;
                    new InventarioData().InsertarActualizarInventario(modInventario);

            
                    modOrdenTrabajo.idtecnicoqc = Usuario.Idusuario;
                    modOrdenTrabajo.__tipooperacion = 3;
                    new ReparacionesData().InsertarActualizarOrdenTrabajo(modOrdenTrabajo);
                }
                else
                {
                    modOrdenServicio.idestado = (Int32)Constantes.EstadoOrdenServicio.PendienteInicioReparacion;
                    modOrdenTrabajo.idestado = (Int32)Constantes.EstadoOrdenTrabajo.Reasignada;
                    modOrdenTrabajo.bounce = modOrdenTrabajo.bounce + 1;
                    modOrdenTrabajo.idtecnicoqc = Usuario.Idusuario;
                    modOrdenTrabajo.__tipooperacion = 3;
                    new ReparacionesData().InsertarActualizarOrdenTrabajo(modOrdenTrabajo);
                }
            }
            else
            {
                if (condicion1 == "true" && condicion2 == "true"
                 && condicion3 == "true"
                 && condicion4 == "true"
                 && condicion5 == "true"
                 && condicion6 == "true"
                 && condicion7 == "true"
                 && condicion8 == "true"
                 && condicion9 == "true"
                 && condicion10 == "true"
                 )
                {
                    if (modOrdenServicio.delivery)
                        modOrdenServicio.idestado = (Int32)Constantes.EstadoOrdenServicio.PendienteDespachoCliente;
                    else
                        modOrdenServicio.idestado = (Int32)Constantes.EstadoOrdenServicio.PendienteEntregaCliente;
                    modInventario.idestado = (int)Constantes.Producto.Reparado;
                    modInventario.__idoperacion = 4;
                    new InventarioData().InsertarActualizarInventario(modInventario);

                    modOrdenTrabajo.idtecnicoqc = Usuario.Idusuario;
                    modOrdenTrabajo.__tipooperacion = 5;
                    new ReparacionesData().InsertarActualizarOrdenTrabajo(modOrdenTrabajo);
                }
                else
                {
                    modOrdenServicio.idestado = (Int32)Constantes.EstadoOrdenServicio.PendienteInicioReparacion;
                    modOrdenTrabajo.idestado = (Int32)Constantes.EstadoOrdenTrabajo.Reasignada;
                    modOrdenTrabajo.bounce = modOrdenTrabajo.bounce + 1;
                    modOrdenTrabajo.idtecnicoqc = Usuario.Idusuario;
                    modOrdenTrabajo.__tipooperacion = 3;
                    new ReparacionesData().InsertarActualizarOrdenTrabajo(modOrdenTrabajo);
                }
            }
            //var condicion14 = collection["chkCondicion15"].ToString();


         
            modOrdenServicio.__tipooperacion = 2;
            new OrdenServicioData().InsertarActualizarOrdenServicio(modOrdenServicio);
            return Json(new { res = true });
        }
        #endregion

        #region Antecedentes

        [HttpPost]
        public ActionResult listarAntecedentesOrdenesServicio(long idordenserviciotecnico)
        {

            var listaAntecedentes = ReparacionesData.GetListarAntecedentesOrdenesServicio(idordenserviciotecnico);
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
                    var propertyInfo = typeof(ListarAntecedentesOrdenServicioDto).GetProperty(parametro);
                    listaAntecedentes = listaAntecedentes.OrderByDescending(x => propertyInfo.GetValue(x, null)).ToList();
                }
                else
                {
                    var parametro = sortColumn;
                    var propertyInfo = typeof(ListarAntecedentesOrdenServicioDto).GetProperty(parametro);
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
        public ActionResult listarAntecedentesDetalleOrdenesServicio(long idordenserviciotecnico)
        {

            var listaAntecedentes = ReparacionesData.GetListarAntecedentesOrdenesServicio(idordenserviciotecnico);
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
                    var propertyInfo = typeof(ListarAntecedentesOrdenServicioDto).GetProperty(parametro);
                    listaAntecedentes = listaAntecedentes.OrderByDescending(x => propertyInfo.GetValue(x, null)).ToList();
                }
                else
                {
                    var parametro = sortColumn;
                    var propertyInfo = typeof(ListarAntecedentesOrdenServicioDto).GetProperty(parametro);
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

        public ActionResult listarAntecedentesDetalleOrdenesServicioDetalle(long idordenserviciotecnico)
        {

            var listaAntecedentes = ReparacionesData.GetListarAntecedentesOrdenesServicioDetalle(idordenserviciotecnico);
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
                    var propertyInfo = typeof(ListarAntecedentesOrdenServicioDetalleDto).GetProperty(parametro);
                    listaAntecedentes = listaAntecedentes.OrderByDescending(x => propertyInfo.GetValue(x, null)).ToList();
                }
                else
                {
                    var parametro = sortColumn;
                    var propertyInfo = typeof(ListarAntecedentesOrdenServicioDetalleDto).GetProperty(parametro);
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
        public PartialViewResult AntecedentesModal(long id)
        {
            var ModOrdenServicio = new OrdenServicioData().obtenerOrdenServicio(id);
            if (ModOrdenServicio.idtipoordenservicio == (Int32)Constantes.tipoordenservicio.osp)
                return PartialView("_AntecedentesModalODP");
            else
                return PartialView("_AntecedentesModalODR");
        }
        public PartialViewResult DetalleOTSModal(long id)
        {
            var modOrdenServicio = new OrdenServicioData().obtenerOrdenServicio(id);


            var modOrdentrabajo = new ReparacionesData().obtenerOrdenTrabajo(modOrdenServicio.idordentrabajo.Value);
            modOrdentrabajo.numeroordentrabajo = modOrdenServicio.numeroost;
            modOrdentrabajo.tiempotranscurrido = DateTime.Now - modOrdenServicio.fechahorainicio.Value;
            modOrdentrabajo.tecnico = modOrdenServicio.tecnicoAsignado;
            modOrdentrabajo.idtipoordenservicio = modOrdenServicio.idtipoordenservicio;
            modOrdentrabajo.idordenserviciotecnico = modOrdenServicio.idordenserviciotecnico.Value;
            modOrdentrabajo.idordentrabajo = modOrdenServicio.idordentrabajo;
            modOrdentrabajo.fechahorainicio = modOrdenServicio.fechahorainicio;
            modOrdentrabajo.numeroordenservicio = modOrdenServicio.numeroordenservicio;

            var producto = new ProductoData().obtenerProducto(modOrdenServicio.idproducto);
            modOrdentrabajo.producto = producto.descripcionlarga;
            modOrdentrabajo.codigoproducto = producto.codigoproducto;
            modOrdentrabajo.idtipoproducto = producto.idtipoproducto.Value;
            modOrdentrabajo.imei = modOrdentrabajo.imei;
            modOrdentrabajo.serie = modOrdentrabajo.serie;
            modOrdentrabajo.idproducto = producto.idproducto.Value;


            if (modOrdenServicio.idincidencia.HasValue && modOrdenServicio.idincidencia != 0)
            {
                var modIncidencia = new IncidenciaData().ObtenerIncidencia(modOrdenServicio.idincidencia.Value);
                modOrdentrabajo.falla = modIncidencia.falla;
            }


            return PartialView("_ModalDetalleOTS", modOrdentrabajo);
        }
        #endregion  
    }
}