using QueryContracts.Smartway.Mantenimiento.Results;
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
using Web.Smartway.Areas.Despacho.Models;
using Web.Smartway.DataAccess.Recepcion;
using Web.Smartway.DataAccess.Agendamiento;
using System.Web;
using System.IO;
using LinqToExcel;
using Web.Smartway.DataAccess.Inventario;
using Web.Smartway.Areas.Inventario.Models;

namespace Web.Smartway.Areas.Agendamiento.Controllers
{
    public class DespachoController : BaseController
    {

        public ActionResult SeguimientoDespacho() { return View(); }
        public JsonResult JsonGetListarDocumentosDespacho(String fechahorainicio
           , String fechahorafin, string numerorecepcion)
        {

            

            var listadoTotal = new DespachoData().GetListarOrdenSalida(null).ToList();
            var resjson1 = (new JqGridExtension<OrdenSalidaModel>()).DataBind(listadoTotal, listadoTotal.Count);
            return resjson1;

        }


        public ActionResult ProgramarDespacho()
        {
            var sucursal = new SucursalData().ListarSucursal("", "", null);
            var listasucursal = new SelectList(
               sucursal,
               "idsucursal",
               "nombre");
            ViewData["listasucursal"] = listasucursal;

            
            var estado = MantenimientoData.GetListarEstado((Int32)Constantes.MaestroTablas.Programacion);
            var listadoestado = new SelectList(estado, "idestado", "estado");
            ViewData["listadoestado"] = listadoestado;




            var transportista = new DespachoData().GetListarTransportista();
            var listadotransportista = new SelectList(transportista, "idtransportista", "razonsocial");
            ViewData["listadotransportista"] = listadotransportista;



            return View();
        }
        [HttpPost]
        public JsonResult JsonGetListarProgramacion(int? idsucursalorigen
            , int? idsucursaldestino
            , int? idestado
            , string fechainicio
            , string fechafin)
        {

            if (fechafin == "")
                fechafin = null;
            if (fechainicio == "")
                fechainicio = null;

            var listadoTotal = DespachoData.GetListarProgramacion(idsucursalorigen
                ,idsucursaldestino
                ,idestado
                ,fechainicio
                ,fechafin).ToList();
            var resjson1 = (new JqGridExtension<ProgramacionModel>()).DataBind(listadoTotal, listadoTotal.Count);
            return resjson1;
        }


        public PartialViewResult ProgramarGuiasModal()
        {
            var sucursal = new SucursalData().ListarSucursal("", "", null);
            var listasucursal = new SelectList(
               sucursal,
               "idsucursal",
               "nombre");
            ViewData["listasucursal"] = listasucursal;

            var transportista = new DespachoData().GetListarTransportista();
            var listadotransportista = new SelectList(transportista, "idtransportista", "razonsocial");
            ViewData["listadotransportista"] = listadotransportista;

            var modProgramar = new ProgramacionModel();
            return PartialView("_ProgramarGuiasModal", modProgramar);
        }
        public JsonResult JsonGetListarGuias ( int? idsucursaldestino, int? idsucursalorigen 
               , string sord
            , int page
            , int rows)
        {
            var listadoTotal = new DespachoData().GetListarGuia(31,idsucursaldestino,idsucursalorigen).ToList();
            var resjson1 = (new JqGridExtension<GuiaRemisionModel>()).DataBind(listadoTotal, listadoTotal.Count);
            return resjson1;
        }
        [HttpPost]
        public JsonResult JsonGenerarDespacho(string ids, DateTime? fecharecojo, int? idtransporte)
        {
            string[] guias = ids.Split(',');
            var modGuiaAct = new GuiaRemisionModel();
            //var modGuiaAct = new GuiaRemisionModel();
            //modGuiaAct.


            foreach (var item in guias)
            {

                var guia = new DespachoData().obtenerGuiaRemision(Convert.ToInt64(item));
                var osts = new RecepcionData().GetListarOrdenServicio(Convert.ToInt32(item));

                foreach (var item1 in osts)
                {
                    var modOrdenServicio = new OrdenServicioModel();
                    modOrdenServicio.idordenserviciotecnico = item1.idordenserviciotecnico;
                    modOrdenServicio.__tipooperacion = 2; // actualizar estado
                    modOrdenServicio.idestado = (Int32)Constantes.EstadoOrdenServicio.PendienteRecojoDelivery;

                    new OrdenServicioData().InsertarActualizarOrdenServicio(modOrdenServicio);
                }
               


            }


            var modGuiaRemision =new DespachoData().obtenerGuiaRemision(Convert.ToInt64(guias[0]));


            var modProgramacion = new ProgramacionModel();
            modProgramacion.idestado = (Int32)(Constantes.EstadoDespacho.programada);
            modProgramacion.fechahoraregistro = DateTime.Now;
            modProgramacion.fecharecojo = fecharecojo;
            modProgramacion.idtransportista = idtransporte.Value;
            modProgramacion.idsucursalorigen = modGuiaRemision.idsucursalorigen;
            modProgramacion.idsucursaldestino = modGuiaRemision.idsucursaldestino;
            modProgramacion.idusuarioregistro = Usuario.Idusuario;
            modProgramacion.numero = "100-000001";
            modProgramacion.__tipooperacion = 1;

            var res = new DespachoData().InsertarActualizarProgramacion(modProgramacion);


            var modProgramacionDetalle = new ProgramacionDetalleModel();

            foreach (var item in guias)
            {

                modGuiaAct = new DespachoData().obtenerGuiaRemision(Convert.ToInt64(item));
                modGuiaAct.idestado = (Int32) Constantes.EstadoGuiaRemision.Programada;
                modGuiaAct.__tipooperacion = 2;
                new DespachoData().InsertarActualizarGuiaRemision(modGuiaAct);

                modProgramacionDetalle = new ProgramacionDetalleModel();
                modProgramacionDetalle.idguia = Convert.ToInt32(item);
                modProgramacionDetalle.idprogramacion = res;

                var resdetalle = new DespachoData().InsertarActualizarProgramacionDetalle(modProgramacionDetalle);
            }


           
            return Json(new { res = true });
        }



        [HttpPost]
        public JsonResult DespacharGuiasDelivery(int idprogramacion)
        {
            new DespachoData().EntregarDespachoDelivery(idprogramacion);
            return Json(new { res = true });
        }



        #region despachomasivo
        public ActionResult DespachoMasivo()
        {
            var producto = new ProductoData().listarProducto("", "", null, null, null, false);
            var listaproducto = new SelectList(producto, "idproducto", "descripcionlarga");
            ViewData["listaproducto"] = listaproducto;
            Session["DespachoMasivo"] = null ;

            var orden = new OrdenSalidaModel();
            orden.fechasalida = DateTime.Now;
            return View(orden);
        }
        public PartialViewResult SubirArchivo()
        {
            OrdenSalidaModel model = new OrdenSalidaModel();
            return PartialView("_UploadFile", model);
        }
        [HttpPost]
        public JsonResult SubirArchivo(HttpPostedFileBase archivo, OrdenSalidaModel model)
        {
            string RutaArchivos = ConfigurationManager.AppSettings["Uploads"].ToString();
            string Carpeta = "File_" + Usuario.Idusuario.ToString();
            string Rutagrabar = RutaArchivos + Carpeta + "\\";
            string file = string.Empty;

            string archivo_subir = (DateTime.Now.ToString("yyyyMMddHHmmss") + "_" + archivo.FileName).ToLower();
            archivo_subir = archivo_subir.Replace(" ", "_").ToString();

            var mod_archivo = new OrdenSalidaModel();

            var allowedExtensions = new[] { ".xlsx", ".xls" };

            var checkextension = Path.GetExtension(archivo.FileName).ToLower();

            if (!allowedExtensions.Contains(checkextension))
            {
                return Json(new { res = false, msj = "No se puede subir archivos con la extensión: " + checkextension }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                file = Rutagrabar + archivo_subir;
            }
            try
            {
                if (Directory.Exists(Rutagrabar))
                    archivo.SaveAs(file);
                else
                {
                    Directory.CreateDirectory(Rutagrabar);
                    archivo.SaveAs(file);
                }
                try
                {
                    var book = new ExcelQueryFactory(file);
                    var headers = book.GetColumnNames("Carga01");
                    var comprobar = headers.ToList();

                    if ("ITEM" != comprobar[0])
                        return Json(new { res = false, msj = "El archivo no tiene el formato establecido." });
                    if ("S/N" != comprobar[1])
                        return Json(new { res = false, msj = "El archivo no tiene el formato establecido." });
                    if ("IMEI" != comprobar[2])
                        return Json(new { res = false, msj = "El archivo no tiene el formato establecido." });
                    if ("MAC" != comprobar[3])
                        return Json(new { res = false, msj = "El archivo no tiene el formato establecido." });
                    if ("PRODUCTO" != comprobar[4])
                        return Json(new { res = false, msj = "El archivo no tiene el formato establecido." });
                   


                    var resultado = (from row_ in book.Worksheet(0)
                                     let item = new OrdenSalidaDetalleModel
                                     {
                                         item = row_[0].Cast<Int16>(),
                                         serie = row_[1].Cast<string>(),
                                         imei = row_[2].Cast<string>(),
                                         mac = row_[3].Cast<string>(),
                                         codigo = row_[4].Cast<string>(),
                                         cantidad = 1,
                                     }
                                     select item).ToList();
                    resultado.RemoveAll(x => x.item == 0);

                    Session["DespachoMasivo"] = resultado;

                }
                catch (Exception ex)
                {
                    return Json(new { res = false, msj = ex.ToString() /*"Existen datos en la columna cantidad que no son números enteros"*/ });
                }

                return Json(new { res = true, archivo = "Nombre del archivo: " + archivo.FileName, msj = "Se cargó el archivo correctamente" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json(new { res = false, msj = "Ocurrió un error al momento de cargar el archivo." });
            }
        }
        [HttpPost]
        public JsonResult JsonListarDetalleDespacho()
        {
            var result = (List<OrdenSalidaDetalleModel>)Session["DespachoMasivo"];
            if (result == null)
                return Json(new { res = false });
            return (new JqGridExtension<OrdenSalidaDetalleModel>()).DataBind(result, result.Count);
        }
        [HttpPost]
        public JsonResult RegistrarDespacho(OrdenSalidaModel model)
        {

            var detalle = (List<OrdenSalidaDetalleModel>)Session["DespachoMasivo"];

            #region comprobar requisitos de la carga
            var modProducto = new ProductoData().obtenerProducto(model.idproducto);


            foreach (var item in detalle)
            {

                switch (modProducto.idrequisitoascanear)
                {
                    case (Int32)Constantes.Scanear.Imei:
                        if (string.IsNullOrEmpty(item.imei))
                            return Json(new { res = false, msj = "La carga requiere del número de IMEI" });
                        break;
                    case (Int32)Constantes.Scanear.Mac:
                        if (string.IsNullOrEmpty(item.mac))
                            return Json(new { res = false, msj = "La carga requiere del número de MAC" });
                        break;
                    case (Int32)Constantes.Scanear.Serie:
                        if (string.IsNullOrEmpty(item.serie))
                            return Json(new { res = false, msj = "La carga requiere del número de Serie" });
                        break;
                    case (Int32)Constantes.Scanear.SerieImei:
                        if (string.IsNullOrEmpty(item.imei))
                            return Json(new { res = false, msj = "La carga requiere del número de IMEI" });
                        if (string.IsNullOrEmpty(item.serie))
                            return Json(new { res = false, msj = "La carga requiere del número de Serie" });
                        break;
                    case (Int32)Constantes.Scanear.SerieImeiMac:
                        if (string.IsNullOrEmpty(item.imei))
                            return Json(new { res = false, msj = "La carga requiere del número de IMEI" });
                        if (string.IsNullOrEmpty(item.serie))
                            return Json(new { res = false, msj = "La carga requiere del número de Serie" });
                        if (string.IsNullOrEmpty(item.mac))
                            return Json(new { res = false, msj = "La carga requiere del número de MAC" });
                        break;
                    default:
                        break;
                }
                var inventario = new InventarioData().obtenerProductoInventario(modProducto.idproducto.Value
                   , item.serie, item.imei);

                if(inventario == null)
                    return Json(new { res = false, msj = "El item con serie: " + item.serie + " no existe." });

                item.idinventario = inventario.idinventario;


                var ordenservicio = new InventarioData().obtenerOrdenServicioxInventario(inventario.idinventario);

                if(ordenservicio == null)
                    return Json(new { res = false, msj = "El item con serie: " + item.serie + " tiene un error con la orden de servicio." });

                item.idordenservicio = ordenservicio.idordenserviciotecnico.Value;
                
                if (inventario.idestado == (Int32)Constantes.EstadoProducto.PendienteReparar)
                {
                    return Json(new { res = false, msj = "El item con serie: " + item.serie + " está pendiente de reparación." });
                }
                if (inventario.idestado != (Int32)Constantes.EstadoProducto.Reparado)
                {
                if (inventario.idestado != (Int32)Constantes.EstadoProducto.Inoperativo)    
                    return Json(new { res = false, msj = "El item con serie: " + item.serie + " no está disponible para despacho." });
                }

            }

            #endregion


            if (detalle == null)
            {
                return Json(new { res = false, msj = "No existen datos cargados en el sistema." });
            }

            model.fechahoraregistro = DateTime.Now;
            model.activo = true;
            model.idusuarioregistro = Usuario.Idusuario;
            model.iddocumentosalida = new DespachoData().InsertarOrdenSalida(model);

            foreach (var item in detalle)
            {
                item.fechahoraatencion = DateTime.Now;
                item.idordensalida = model.iddocumentosalida.Value;
                item.cantidad = 1;
                item.idusuarioatencion = Usuario.Idusuario;
                item.idproducto = model.idproducto;

                new DespachoData().InsertarOrdenSalidaDetalle(item);
                


                var inventarioModel = new InventarioModel();

                inventarioModel.idestado = (Int16)Constantes.Producto.NoDisponible;
                inventarioModel.idinventario = item.idinventario;
                inventarioModel.cantidad = 0;
                inventarioModel.__idoperacion = 2;


                new InventarioData().InsertarActualizarInventario(inventarioModel);


                var ordenServicioModel = new OrdenServicioModel();
                ordenServicioModel.idordenserviciotecnico = item.idordenservicio;
                ordenServicioModel.idestado = (Int16) Constantes.EstadoOrdenServicio.Cerrada;
                ordenServicioModel.__tipooperacion = 2;


                new OrdenServicioData().InsertarActualizarOrdenServicio(ordenServicioModel);

            }
            return Json(new { res = true });
        }
        #endregion


    }
}

