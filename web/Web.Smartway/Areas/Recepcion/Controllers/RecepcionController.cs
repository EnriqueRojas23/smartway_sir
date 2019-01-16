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
using Web.Smartway.Areas.Recepcion.Models;
using Web.Smartway.DataAccess.Recepcion;
using Web.Smartway.DataAccess.Agendamiento;
using Web.Smartway.Areas.Inventario.Models;
using Web.Smartway.DataAccess.Inventario;
using System.Web;
using System.IO;
using LinqToExcel;


namespace Web.Smartway.Areas.Agendamiento.Controllers
{
    public class RecepcionController : BaseController
    {
        public ActionResult RecepcionGuias()
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



            return View();
        }

        #region SeguimientoRecepcion

        public ActionResult SeguimientoRecepcion()
        {
            return View();
        }
        public JsonResult JsonGetListarDocumentosRecepcion(String fechahorainicio
            , String fechahorafin, string numerorecepcion)
        {

            if (fechahorainicio == "") fechahorainicio = null;
            if (fechahorafin == "") fechahorafin = null;

            var listadoTotal = new RecepcionData().GetListarDocumentoRecepcion(fechahorainicio, fechahorafin, numerorecepcion).ToList();
            var resjson1 = (new JqGridExtension<DocumentoRecepcionModel>()).DataBind(listadoTotal, listadoTotal.Count);
            return resjson1;

        }
        #endregion
        public ActionResult RecepcionOrdenServicio(int id)
        {
            Session["GuiaDetalle"] = null;


            var guia = new DespachoData().obtenerGuiaRemision(id);


            var modRecepcion = new RecepcionModel();
            modRecepcion.recepcionFinalizadaAlmacen = false;
            modRecepcion.numeroguia = guia.numeroguia;
            modRecepcion.idsucursaldestino = guia.idsucursaldestino;
            modRecepcion.idsucursalorigen = guia.idsucursalorigen;
            modRecepcion.idguiaremision = id;

            var sucursal = new SucursalData().ListarSucursal("", "", null);
            var listasucursal = new SelectList(
               sucursal,
               "idsucursal",
               "nombre");
            ViewData["listasucursal"] = listasucursal;





            return View(modRecepcion);
        }
        public JsonResult JsonGetListarGuias(int? idsucursaldestino, int? idsucursalorigen
               , string sord
            , int page
            , int rows)
        {
            var listadoTotal = new DespachoData().GetListarGuia(32, idsucursaldestino, idsucursalorigen).ToList();
            var resjson1 = (new JqGridExtension<GuiaRemisionModel>()).DataBind(listadoTotal, listadoTotal.Count);
            return resjson1;
        }
        public JsonResult JsonGetListarOrdenServicio(int idguiaremision)
        {

            List<OrdenServicioModel> listadoTotal;

            if (Session["GuiaDetalle"] != null)
                listadoTotal = (List<OrdenServicioModel>)Session["GuiaDetalle"];
            else
                listadoTotal = new RecepcionData().GetListarOrdenServicio(idguiaremision).ToList();


            Session["GuiaDetalle"] = listadoTotal;

            var draw = Request.Form.GetValues("draw").FirstOrDefault();
            var start = Request.Form.GetValues("start").FirstOrDefault();
            var length = Request.Form.GetValues("length").FirstOrDefault();
            var sortColumn = Request.Form.GetValues("columns[" + Request.Form.GetValues("order[0][column]").FirstOrDefault() + "][name]").FirstOrDefault();
            var sortColumnDir = Request.Form.GetValues("order[0][dir]").FirstOrDefault();
            var searchValue = Request.Form.GetValues("search[value]").FirstOrDefault();

            if (sortColumn != "" && sortColumnDir != "")
            {
                if (sortColumnDir.ToUpper() == "DESC")
                {
                    var parametro = sortColumn;
                    var propertyInfo = typeof(OrdenServicioModel).GetProperty(parametro);
                    listadoTotal = listadoTotal.OrderByDescending(x => propertyInfo.GetValue(x, null)).ToList();
                }
                else
                {
                    var parametro = sortColumn;
                    var propertyInfo = typeof(OrdenServicioModel).GetProperty(parametro);
                    listadoTotal = listadoTotal.OrderBy(x => propertyInfo.GetValue(x, null)).ToList();
                }
            }
            var displayedDocumentos = listadoTotal;
            int pageSize = length != null ? Convert.ToInt32(length) : 0;
            int skip = start != null ? Convert.ToInt32(start) : 0;
            int recordsTotal = 0;
            recordsTotal = displayedDocumentos.Count();
            var data = displayedDocumentos.Skip(skip).Take(pageSize).ToList();
            return Json(new { draw = draw, recordsFiltered = recordsTotal, recordsTotal = recordsTotal, data = data }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult RecepcionarDocumentoAgregadoAlmacen(string documento)
        {
            try
            {
                bool requiereImei = false;
                if (Session["GuiaDetalle"] != null)
                {
                    var ListaDetalle = (List<OrdenServicioModel>)Session["GuiaDetalle"];

                    var DocumentoBusqueda = ListaDetalle.Where(x =>
                    x.numeroordenservicio == documento).SingleOrDefault();
                    DocumentoBusqueda.requiereimei = true;
                    if (DocumentoBusqueda != null)
                    {
                        DocumentoBusqueda.documento_coincide = true;
                        if (DocumentoBusqueda.requiereimei == false)
                        {
                            DocumentoBusqueda.recepciondestino = true;
                            requiereImei = DocumentoBusqueda.requiereimei;
                        }
                        else
                        {
                            DocumentoBusqueda.recepciondestino = false;
                            requiereImei = DocumentoBusqueda.requiereimei;
                        }
                    }
                    else
                    {
                        //string tipoDocumento = "";
                        //if (documento.Length > 3) { tipoDocumento = documento.Substring(0, 3); }

                        //var Existe = IncidenciasData.ValidarDocumentoInterno(tipoDocumento, documento);

                        //if (Existe.existe > 0)
                        //{
                        //    var DatosSobrante = IncidenciasData.ObtenerDocumentoInterno(tipoDocumento, documento);

                        //    if (DatosSobrante != null)
                        //    {
                        //        var ListaSobrantes = (List<ListarDetalleGuiaDto>)Session[SESSION_DETALLE_SOBRANTES];

                        //        ListarDetalleGuiaDto Sobrante = new ListarDetalleGuiaDto();
                        //        Sobrante.inc_int_id = DatosSobrante.inc_int_id;
                        //        Sobrante.dci_int_id = DatosSobrante.dci_int_id;
                        //        Sobrante.documento_interno = DatosSobrante.numero;
                        //        Sobrante.pro_str_codigo = DatosSobrante.pro_str_codigo;
                        //        Sobrante.pro_str_descripcion = DatosSobrante.pro_str_descripcion;
                        //        Sobrante.pro_str_serieimei = DatosSobrante.pro_str_serieimei;

                        //        ListaSobrantes.Add(Sobrante);
                        //        Session[GuiaDetalle] = ListaSobrantes;
                        //    }
                        //}





                    }

                    Session["GuiaDetalle"] = ListaDetalle;
                }

                return Json(new { res = true, imei = requiereImei }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { res = false, imei = false }, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult ConfirmarIMEIDocumentoAgregadoAlmacen(string imei)
        {
            try
            {
                if (Session["GuiaDetalle"] != null)
                {
                    var ListaDetalle = (List<OrdenServicioModel>)Session["GuiaDetalle"];

                    foreach (var detalle in ListaDetalle)
                    {
                        if (detalle.serie == imei && detalle.documento_coincide == true && detalle.requiereimei == true)
                        {
                            detalle.recepciondestino = true;
                            detalle.documento_coincide = true;
                            detalle.imei_coincide = true;
                            detalle.imei_escaneado = imei;
                            detalle.fecharecepcion = DateTime.Now.ToShortDateString();
                            //detalle.mnr_int_id = 0;
                            break;
                        }
                        else if (detalle.serie != imei && detalle.documento_coincide == true && detalle.requiereimei == true)
                        {
                            detalle.imei_coincide = false;
                            detalle.imei_escaneado = imei;
                            //detalle.mnr_int_id = 0;
                        }
                    }
                    Session["GuiaDetalle"] = ListaDetalle;
                }

                return Json(new { res = true }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { res = false }, JsonRequestBehavior.AllowGet);
            }
        }

        //[AcceptVerbs(HttpVerbs.Post)]
        [HttpPost]
        public JsonResult FinalizarRecepcionAlmacen(RecepcionModel model)
        {
            if (Session["GuiaDetalle"] != null)
            {
                var modGuiaRemision = new DespachoData().obtenerGuiaRemision(model.idguiaremision);
                //var ordenesservicio =  new RecepcionData().GetListarOrdenServicio(model.idguiaremision);
                var ListaDetalle = (List<OrdenServicioModel>)Session["GuiaDetalle"];

                foreach (var item in ListaDetalle)
                {
                    if (item.recepciondestino)
                    {
                        item.idestado = (Int32) Constantes.EstadoOrdenServicio.PendienteAsignacionTecnico;
                        item.__tipooperacion = 2;
                        new OrdenServicioData().InsertarActualizarOrdenServicio(item);
                    }
                }
                modGuiaRemision.idestado = (Int32) Constantes.EstadoGuiaRemision.Recepcionada;
                modGuiaRemision.__tipooperacion = 2; 
                new DespachoData().InsertarActualizarGuiaRemision(modGuiaRemision);


            }
            return Json(new { res = true });
        }


        #region RecepcionMasivaOSP

        public ActionResult RecepcionMasivaosp()
        {
            Session["DocumentoRecepcion"] = null;
            var modRecepcion = new DocumentoRecepcionModel();

            ViewData["listaorigen"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.Origen);

            var sucursal = new SucursalData().ListarSucursal("", "", null);
            var listasucursal = new SelectList(
               sucursal,
               "idsucursal",
               "nombre");
            ViewData["listasucursal"] = listasucursal;


            var fabricante = new PartnerData().ListarPartner(null, null).Where(x => x.idtipopartner.Equals(2)).ToList();
            var listafabricante = new SelectList(
              fabricante
             , "idpartner"
             , "razonsocial"
             );
            ViewData["listafabricante"] = listafabricante;


            var producto = new ProductoData().listarProducto("", "", null, null, null, false);
            var listaproducto = new SelectList(producto, "idproducto", "descripcionlarga");
            ViewData["listaproducto"] = listaproducto;


            var cliente = MantenimientoData.GetListarClientes(null, true);
            var listacliente = new SelectList(
                 cliente
                , "idcliente"
                , "nombre"
                );
            ViewData["listacliente"] = listacliente;


            //var partners = new PartnerData().ListarPartner(null, null).Where(x => x.idtipopartner.Equals(1)).ToList();
            //var listapartners = new SelectList(
            //     partners
            //    , "idpartner"
            //    , "razonsocial"
            //    );
            //ViewData["listapartner"] = listapartners;

            return View(modRecepcion);
        }

        public JsonResult guardarIngreso(DocumentoRecepcionModel model)
        {
            
            var detalle = (List<DocumentoRecepcionDetalleModel>)Session["DocumentoRecepcion"];

            if (detalle == null)
            {
                return Json(new { res = false, msj = "Debe de cargar un excel al sistema" });
            }

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
            }



                #endregion

            List<InventarioModel> inventarios = new List<InventarioModel>();
            InventarioModel inventarioModel = null; // new InventarioModel();
            DocumentoRecepcionDetalleModel modelDetalle = null;
            OrdenServicioModel ordenModel = new OrdenServicioModel();
            List<DocumentoRecepcionDetalleModel> detalles = new List<DocumentoRecepcionDetalleModel>();


          

            ordenModel.activo = true;
            ordenModel.anioincindecia = DateTime.Now.Year;
            ordenModel.bounce = "0";
            ordenModel.idproducto = model.idproducto;
            ordenModel.codigoproducto = "Varios";
            ordenModel.idusuario = Usuario.Idusuario;
            ordenModel.cotizado = false;
            ordenModel.documento_coincide = false;
            ordenModel.engarantia = true;
            ordenModel.fechahoraregistro = DateTime.Now;
            ordenModel.idestado = (Int16)Constantes.EstadoOrdenServicio.PendienteAsignacionTecnico;
            ordenModel.idtipoordenservicio = (Int16)Constantes.tipoordenservicio.osp;
            ordenModel.idsucursalorigen = Usuario.idsucursal;
            ordenModel.__tipooperacion = 1;
            ordenModel.delivery = true;
            ordenModel = new OrdenServicioData().InsertarActualizarOrdenServicio(ordenModel);
            model.fechahoraregistro = DateTime.Now;
            model.activo = true;
            model.idtiporecibo =(Int16) Constantes.TipoRecibo.Personalizacion;
            model.idusuarioregistro = Usuario.Idusuario;
            model.idordenservicio = ordenModel.idordenserviciotecnico.Value;
            model.idproducto = model.idproducto;
            
            model.iddocumentorecepcion =  new RecepcionData().insertarActualizarDocumentoRecepcion(model);

            foreach (var item in detalle)
            {
                inventarioModel = new InventarioModel();
                modelDetalle = new DocumentoRecepcionDetalleModel();

                inventarioModel.idproducto = model.idproducto;
                modelDetalle.caja = "";
                modelDetalle.cantidad = 1;
                modelDetalle.codigo = item.codigo;
                modelDetalle.fabricante = "";
                modelDetalle.fechahorapersonalizacion = DateTime.Now;
                modelDetalle.fila = item.fila;
                modelDetalle.iddocumentorecepcion = model.iddocumentorecepcion.Value;
                modelDetalle.idfila = item.idfila;
                modelDetalle.idmodelo = item.idmodelo;
                modelDetalle.idproducto = inventarioModel.idproducto;
                modelDetalle.idusuariopersonalizacion = Usuario.Idusuario;
                modelDetalle.numeropallet = item.pallet;
                modelDetalle.repuesto = false;
                modelDetalle.serie = item.serie;
                detalles.Add(modelDetalle);


         
                inventarioModel.cantidad = item.cantidad;
                inventarioModel.codigoproducto = item.codigo;
                inventarioModel.fechahoraregistro = DateTime.Now;
                inventarioModel.idalmacen = model.idalmacen;
                inventarioModel.idestado = (Int16)Constantes.Producto.PendientePersonalizar;
                inventarioModel.serie = item.serie;
                inventarioModel.imei = item.imei;
                inventarioModel.pallet = item.pallet;
                inventarioModel.idusuarioregistro = Usuario.Idusuario;
                inventarioModel.__idoperacion = 1;
                inventarioModel.iddocumentorecepcion = model.iddocumentorecepcion.Value;
                new InventarioData().InsertarActualizarInventario(inventarioModel);

            }

            RecepcionData.InsertarDocumentoRecepcionDetalleLote(detalles);

            return Json(new { res = true });
        }
        [HttpPost]
        public JsonResult JsonListarDetalleCarga()
        {
            var result = (List<DocumentoRecepcionDetalleModel>)Session["DocumentoRecepcion"];
            if (result == null)
                return Json(new { res = false });
            return (new JqGridExtension<DocumentoRecepcionDetalleModel>()).DataBind(result, result.Count);
        }
        [HttpPost]
        public JsonResult SubirArchivo(HttpPostedFileBase archivo, DocumentoRecepcionModel model)
        {
            string RutaArchivos = ConfigurationManager.AppSettings["Uploads"].ToString();
            string Carpeta = "File_" + Usuario.Idusuario.ToString();
            string Rutagrabar = RutaArchivos + Carpeta + "\\";
            string file = string.Empty;

            string archivo_subir = (DateTime.Now.ToString("yyyyMMddHHmmss") + "_" + archivo.FileName).ToLower();
            archivo_subir = archivo_subir.Replace(" ", "_").ToString();

            var mod_archivo = new DocumentoRecepcionModel();

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
                //validar archivo...
                // const Int32 BufferSize = 128;
                //var line = string.Empty;

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
                    if ("PALLET" != comprobar[5])
                        return Json(new { res = false, msj = "El archivo no tiene el formato establecido." });
                    if ("FECHA DE INGRESO" != comprobar[6])
                        return Json(new { res = false, msj = "El archivo no tiene el formato establecido." });
                    if ("FABRICANTE" != comprobar[7])
                        return Json(new { res = false, msj = "El archivo no tiene el formato establecido." });


                    var resultado = (from row_ in book.Worksheet(0)
                                     let item = new DocumentoRecepcionDetalleModel
                                     {
                                         item = row_[0].Cast<Int16>(),
                                         serie = row_[1].Cast<string>(),
                                         imei = row_[2].Cast<string>(),
                                         mac = row_[3].Cast<string>(),
                                         codigo = row_[4].Cast<string>(),
                                         pallet = row_[5].Cast<string>(),
                                         fabricante = row_[7].Cast<string>(),
                                         cantidad = 1,
                                     }
                                     select item).ToList();

                    Session["DocumentoRecepcion"] = resultado;

                }
                catch (Exception ex)
                {
                    return Json(new { res = false, msj = ex.ToString() /*"Existen datos en la columna cantidad que no son números enteros"*/ });
                    //throw;
                }

                //var idarchivo = new DataAccess.Liquidacion.LiquidacionData().InsertarArchivo(mod_archivo);
                return Json(new { res = true, archivo = "Nombre del archivo: " + archivo.FileName, msj = "Se cargó el archivo correctamente" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json(new { res = false, msj = "Ocurrió un error al momento de cargar el archivo." });
            }
            //return Json(new { res = true });
        }
        public PartialViewResult SubirArchivo()
        {
            DocumentoRecepcionModel model = new DocumentoRecepcionModel();
            return PartialView("_UploadFile", model);
        }
        public JsonResult listarAlmacenes(int idsucursal)
        {
            var almacenes = InventarioData.GetListarAlmacen(idsucursal, null).Where(x=>x.idalmacen== 10).ToList();
            var listaalmacen = new SelectList(almacenes, "idalmacen", "nombrealmacen");

            return Json(listaalmacen);
        }
        #endregion

        #region RecepcionMasivaOSR
        public ActionResult RecepcionMasivaosr()
        {
            Session["DocumentoRecepcion"] = null;
            var modRecepcion = new DocumentoRecepcionModel();

            ViewData["listaorigen"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.Origen);

            var sucursal = new SucursalData().ListarSucursal("", "", null);
            var listasucursal = new SelectList(
               sucursal,
               "idsucursal",
               "nombre");
            ViewData["listasucursal"] = listasucursal;


            var fabricante = new PartnerData().ListarPartner(null, null).Where(x => x.idtipopartner.Equals(2)).ToList();
            var listafabricante = new SelectList(
              fabricante
             , "idpartner"
             , "razonsocial"
             );
            ViewData["listafabricante"] = listafabricante;


            var producto = new ProductoData().listarProducto("", "", null, null, null, false);
            var listaproducto = new SelectList(producto, "idproducto", "descripcionlarga");
            ViewData["listaproducto"] = listaproducto;

            var cliente = MantenimientoData.GetListarClientes(null, true);
            var listacliente = new SelectList(
                 cliente
                , "idcliente"
                , "nombre"
                );
            ViewData["listacliente"] = listacliente;



            var partners = new PartnerData().ListarPartner(null, null);
            var listapartners = new SelectList(
                 partners
                , "idpartner"
                , "razonsocial"
                );
            ViewData["listapartner"] = listapartners;


            return View(modRecepcion);
        }

        public JsonResult guardarIngresoosr(DocumentoRecepcionModel model)
        {

            var detalle = (List<DocumentoRecepcionDetalleModel>)Session["DocumentoRecepcion"];

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
            }



            #endregion

            List<InventarioModel> inventarios = new List<InventarioModel>();
            InventarioModel inventarioModel = null; // new InventarioModel();
            DocumentoRecepcionDetalleModel modelDetalle = null;
            OrdenServicioModel ordenModel = new OrdenServicioModel();

            if (detalle == null)
            {
                return Json(new { res = false, msj = "No existen datos cargados en el sistema." });
            }

            model.fechahoraregistro = DateTime.Now;
            model.activo = true;
            model.idtiporecibo = (Int16)Constantes.TipoRecibo.Reparacion;
            model.idusuarioregistro = Usuario.Idusuario;
            
            model.iddocumentorecepcion = new RecepcionData().insertarActualizarDocumentoRecepcion(model);

            foreach (var item in detalle)
            {
                inventarioModel = new InventarioModel();

                inventarioModel.cantidad = item.cantidad;
                inventarioModel.codigoproducto = item.codigo;
                inventarioModel.fechahoraregistro = DateTime.Now;
                inventarioModel.idalmacen = model.idalmacen;
                inventarioModel.idestado = (Int16)Constantes.Producto.PendienteReparar;
                inventarioModel.serie = item.serie;
                inventarioModel.imei = item.imei;
                inventarioModel.mac = item.mac;
                inventarioModel.pallet = item.pallet;
                inventarioModel.idusuarioregistro = Usuario.Idusuario;
                inventarioModel.__idoperacion = 1;
                inventarioModel.idproducto = model.idproducto;
                inventarioModel.iddocumentorecepcion = model.iddocumentorecepcion.Value;


                inventarioModel.idinventario = new InventarioData().InsertarActualizarInventario(inventarioModel);






                ordenModel = new OrdenServicioModel();

                ordenModel.activo = true;
                ordenModel.anioincindecia = DateTime.Now.Year;
                ordenModel.bounce = "0";
                ordenModel.idproducto = model.idproducto;
                ordenModel.codigoproducto =  modProducto.codigoproducto ;
                ordenModel.idusuario = Usuario.Idusuario;
                ordenModel.cotizado = false;
                ordenModel.documento_coincide = false;
                ordenModel.engarantia = true;
                ordenModel.fechahoraregistro = DateTime.Now;
                ordenModel.idestado = (Int16)Constantes.EstadoOrdenServicio.PendienteAsignacionTecnico;
                ordenModel.idtipoordenservicio = (Int16)Constantes.tipoordenservicio.osr;
                ordenModel.__tipooperacion = 1;
                ordenModel.idcliente = model.idcliente;
                ordenModel.idpartner = model.idpartner;
                ordenModel.serie = item.serie;
                ordenModel.imei = item.imei;
                ordenModel.mac = item.mac;
                ordenModel.iddocumentorecepcion = model.iddocumentorecepcion.Value;
                ordenModel.idinventario = inventarioModel.idinventario.Value;




                ordenModel = new OrdenServicioData().InsertarActualizarOrdenServicio(ordenModel);








          
                modelDetalle = new DocumentoRecepcionDetalleModel();

                inventarioModel.idproducto = model.idproducto;
                modelDetalle.caja = "";
                modelDetalle.cantidad = 1;
                modelDetalle.codigo = item.codigo;
                modelDetalle.fabricante = "";
                modelDetalle.fechahorapersonalizacion = DateTime.Now;
                modelDetalle.fila = item.fila;
                modelDetalle.iddocumentorecepcion = model.iddocumentorecepcion.Value;
                modelDetalle.idfila = item.idfila;
                modelDetalle.idmodelo = item.idmodelo;
                modelDetalle.idproducto = inventarioModel.idproducto;
                modelDetalle.idusuariopersonalizacion = Usuario.Idusuario;

                modelDetalle.numeropallet = item.pallet;
                modelDetalle.repuesto = false;
                modelDetalle.serie = item.serie;
                modelDetalle.mac = item.mac;
                new RecepcionData().insertarActualizarDocumentoRecepcionDetalle(modelDetalle);



     

            }
            return Json(new { res = true });
        }
        #endregion

    }
}