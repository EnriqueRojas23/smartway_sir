using System;
using System.Linq;
using System.Web.Mvc;
using Web.Common.Controllers;
using Web.Smartway.DataAccess;
using Web.Smartway.DataAccess.Mantenimiento;
using Web.Common.Extensions;
using Web.Smartway.DataAccess.Inventario;
using Web.Smartway.Areas.Inventario.Models;
using System.Web;
using Web.Smartway.Areas.Recepcion.Models;
using System.Configuration;
using System.IO;
using System.Text;
using LinqToExcel;
using System.Collections.Generic;
using Web.Smartway.DataAccess.Recepcion;
using Web.Smartway.Areas.Mantenimiento.Models;

namespace Web.Smartway.Areas.Agendamiento.Controllers
{
    public class InventarioController : BaseController
    {
 

        #region operacionesInventario
        public ActionResult InventarioOperaciones()
        {

            var sucursal = new SucursalData().ListarSucursal("", "", null, Usuario.idpartner);
            var listasucursal = new SelectList(
               sucursal,
               "idsucursal",
               "nombre");
            ViewData["listasucursal"] = listasucursal;

            var producto = new ProductoData().listarProducto("", "", null, null, null,null);
            var listaproducto = new SelectList(producto, "idproducto", "descripcionlarga");
            ViewData["listaproducto"] = listaproducto;

            var model = new InventarioModel();


            return View(model);
        }

        public JsonResult listarAlmacenes(int idsucursal)
        {
            var almacenes = InventarioData.GetListarAlmacen(idsucursal, null).Where(x => x.idalmacen == 11 ||
            x.idalmacen == 13).ToList();

            var listaalmacen = new SelectList(almacenes, "idalmacen", "nombrealmacen");

            return Json(listaalmacen);
        }
        [HttpPost]
        public JsonResult ObtenerProducto(int idproducto)
        {

            var model = new ProductoData().obtenerProducto(idproducto);
            switch (model.idrequisitoascanear.Value)
            {
                case (Int16)(Constantes.Scanear.Imei):
                    model.requiereimei = true;
                    break;
                case (Int16)(Constantes.Scanear.Serie):
                    model.requiereserie = true;
                    break;
                case (Int16)(Constantes.Scanear.SerieImei):
                    model.requiereserie = true;
                    model.requiereimei = true;
                    break;
                default:
                    break;
            }

            return Json(model);
        }


        public JsonResult obtenerInventario(int idalmacen, int idproducto, string imei, string serie)
        {

            int idestado = 45;

           var inventario = new InventarioData().obtenerInventario(idalmacen, idproducto, idestado);
            if(inventario == null)
                return Json(new { res = false });
           else return Json(new { res = true, inventario });
                
        }

        [HttpPost]
        public JsonResult JsonListarInventario(int? idproducto, int idalmacen, string serie, string imei)
        {
            if (imei == "")
                imei = null;
            if (serie == "")
                serie = null;


            var result = InventarioData.GetListarInventarioxAlmacen(idalmacen, serie, imei, idproducto).ToList();
            return (new JqGridExtension<InventarioModel>()).DataBind(result, result.Count);
        }


        [HttpPost]
        public JsonResult ActualizarInventario(InventarioModel model)
        {
            model.__idoperacion = 3;
            var result =  new InventarioData().InsertarActualizarInventario(model);
            return Json(new { res = true });
        }

        #endregion

        #region OrdenIngreso

        public ActionResult OrdenIngreso()
        {

            var sucursal = new SucursalData().ListarSucursal("", "", null, Usuario.idpartner);
            var listasucursal = new SelectList(
               sucursal,
               "idsucursal",
               "nombre");
            ViewData["listasucursal"] = listasucursal;

            ViewData["listaorigen"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.Origen);

            var fabricante = new PartnerData().ListarPartner(null, null);
            var listafabricante = new SelectList(
              fabricante
             , "idpartner"
             , "razonsocial"
             );
            ViewData["listafabricante"] = listafabricante;




            Session["DocumentoRecepcion"] = null;
            

            return View();
        }
        public JsonResult guardarIngreso(DocumentoRecepcionModel model)
        {

            var detalle = (List<DocumentoRecepcionDetalleModel>)Session["DocumentoRecepcion"];

            if(detalle == null)
                return Json(new { res = false , msj = "Debe cargar un excel." });


            DocumentoRecepcionDetalleModel modelDetalle = null;
            modelDetalle = new DocumentoRecepcionDetalleModel();


            List<DocumentoRecepcionDetalleModel> detalles = new List<DocumentoRecepcionDetalleModel>(); 


            model.fechahoraregistro = DateTime.Now;
            model.activo = true;
            model.idtiporecibo = (Int16)Constantes.TipoRecibo.NuevaRecepcion;
            model.idusuarioregistro = Usuario.Idusuario;
            model.fechahorarecepcion = DateTime.Now;

            model.iddocumentorecepcion = new RecepcionData().insertarActualizarDocumentoRecepcion(model);

            List<InventarioModel> inventarios= new List<InventarioModel>();
            InventarioModel inventarioModel = null; // new InventarioModel();

            foreach (var item in detalle)
            {
                inventarioModel = new InventarioModel();
                inventarioModel.cantidad = item.cantidad;
                inventarioModel.codigoproducto = item.codigo;
                inventarioModel.fechahoraregistro = DateTime.Now;
                inventarioModel.idalmacen = model.idalmacen;
                inventarioModel.idestado = (Int16)Constantes.Producto.Disponible;
                inventarioModel.serie = item.serie;
                inventarioModel.imei = item.imei;
                inventarioModel.mac = item.mac;
                inventarioModel.pallet = item.pallet;
                inventarioModel.caja = item.caja;
                inventarioModel.ubicacion = item.ubicacion;
                //inventarioModel. 
                
                inventarioModel.idusuarioregistro = Usuario.Idusuario;

                //int? idproducto = new ProductoData().obtenerProducto(null, item.codigo).idproducto;
                //if(idproducto!=null)
                inventarioModel.idproducto = item.idproducto;
                inventarioModel.__idoperacion = 1;
                new InventarioData().InsertarActualizarInventario(inventarioModel);



                modelDetalle = new DocumentoRecepcionDetalleModel();

                modelDetalle.caja = item.caja;
                modelDetalle.cantidad = item.cantidad;
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
                //modelDetalle.repuesto = false;
                modelDetalle.serie = item.serie;
                modelDetalle.mac = item.mac;
                modelDetalle.pallet = item.pallet;
                modelDetalle.ubicacion = item.ubicacion;
                modelDetalle.imei = item.imei;
                modelDetalle.idtipoproducto = item.idtipoproducto;
                modelDetalle.idalmacen = model.idalmacen;
                modelDetalle.repuesto = item.repuesto;
                

                detalles.Add(modelDetalle);

                //new RecepcionData().insertarActualizarDocumentoRecepcionDetalle(modelDetalle);

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
                    var _datos = book.Worksheet(0).Skip(1);
                    var comprobar = headers.ToList();

                    //if ("Código" != comprobar[0])
                    //    return Json(new { res = false, msj = "El archivo no tiene el formato establecido." });
                    //if ("Modelo" != comprobar[1])
                    //    return Json(new { res = false, msj = "El archivo no tiene el formato establecido." });
                    //if ("Serie" != comprobar[2])
                    //    return Json(new { res = false, msj = "El archivo no tiene el formato establecido." });
                    //if ("IMEI" != comprobar[3])
                    //    return Json(new { res = false, msj = "El archivo no tiene el formato establecido." });
                    //if ("MAC" != comprobar[4])
                    //    return Json(new { res = false, msj = "El archivo no tiene el formato establecido." });
                    //if ("Cantidad" != comprobar[5])
                    //    return Json(new { res = false, msj = "El archivo no tiene el formato establecido." });


                    var resultado = (from row_ in book.Worksheet(0)
                                     let item = new DocumentoRecepcionDetalleModel
                                     {
                                         codigo = row_[0].Value.ToString(),
                                         modelo = row_[1].Value.ToString(),
                                         serie = row_[2].Value.ToString(),
                                         imei = row_[3].Value.ToString(),
                                         mac = row_[4].Value.ToString(),
                                         _cantidad_aux = row_[5].Value.ToString(),
                                         ubicacion = row_[6].Value.ToString(),
                                         caja = row_[7].Value.ToString(),
                                         pallet = row_[8].Value.ToString(),


                                         //    Monto = row_[3].Cast<decimal>()
                                     }
                                     select item).ToList();

                    List<DocumentoRecepcionDetalleModel> auxlist = new List<DocumentoRecepcionDetalleModel>();
                    int max = resultado.Count;
                    int i = 1;
                    while (max > i)
                    {
                        resultado[i].cantidad = Convert.ToInt32(resultado[i]._cantidad_aux);
                        auxlist.Add(resultado[i]);
                        i++;
                    }


                    Session["DocumentoRecepcion"] = auxlist;

                    #region comprobar requisitos de la carga
                            ProductoModel modProducto = null;
                            String Productos = null;
                            List<DocumentoRecepcionDetalleModel> det;
                            foreach (var item in auxlist)
                            {
                                Productos = Productos + "," + item.codigo;
                            }
                            var resp = new ProductoData().listarProductoxId(Productos);

                            foreach (var item in auxlist)
                            {
                                modProducto = resp.Where(x => x.codigoproducto.Equals(item.codigo)).SingleOrDefault();

                                if (modProducto == null)
                                {
                                    return Json(new { res = false, msj = "El producto: " + item.codigo + " no existe en la base de datos." });
                                }

                                item.idproducto = modProducto.idproducto.Value;
                                item.idtipoproducto = modProducto.idtipoproducto.Value;
                                item.repuesto = modProducto.repuesto.Value;
                                item.idmodelo = modProducto.idmodelo.Value;

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

                            Session["DocumentoRecepcion"] = auxlist;
                            foreach (var item in resp)
                                {
                                    switch (item.idrequisitoascanear)
                                    {
                                        case (Int16)Constantes.Scaneo.IMEI:
                                            foreach (var item1 in auxlist.Where(x => x.codigo == item.codigoproducto).ToList())
                                            {
                                                det = auxlist
                                                    .Where(x => x.codigo == item.codigoproducto)
                                                    .Where(x => x.imei.Equals(item1.imei)).ToList();

                                                if (det.Count > 1)
                                                    return Json(new { res = false, msj = "El producto: " + item1.imei + " se está registrando más de una vez." });
                                            }
                                            break;
                                        case (Int16)Constantes.Scaneo.SerieIMEI:
                                            foreach (var item1 in auxlist.Where(x => x.codigo == item.codigoproducto).ToList())
                                            {
                                                det = auxlist
                                                .Where(x => x.codigo == item.codigoproducto)
                                                .Where(x => x.serie.Equals(item1.serie) && x.imei.Equals(item1.imei)).ToList();
                                                if (det.Count > 1)
                                                    return Json(new { res = false, msj = "El producto: " + item1.codigo + " se está registrando más de una vez." });
                                            }
                                            break;
                                        case (Int16)Constantes.Scaneo.Serie:
                                            foreach (var item1 in auxlist.Where(x => x.codigo == item.codigoproducto).ToList())
                                            {
                                                det = auxlist
                                                .Where(x => x.codigo == item.codigoproducto)
                                                .Where(x => x.serie.Equals(item1.serie)).ToList();
                                                if (det.Count > 1)
                                                    return Json(new { res = false, msj = "El producto: " + item1.codigo + " se está registrando más de una vez." });
                                            }
                                            break;
                                        default:
                                            break;
                                    }


                                }

                    #endregion


                    

                }
                catch (Exception ex)
                {
                    return Json(new { res = false, msj = "Existen datos en la columna cantidad que no son números enteros" });
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
        #endregion

        #region inventario operaciones
        public PartialViewResult ModificarProductoInventarioModal(int idinventario)
        {
            InventarioModel model = new InventarioModel();
            model.idinventario = idinventario;

            var sucursal = new SucursalData().ListarSucursal("", "", null, Usuario.idpartner);
            var listasucursal = new SelectList(
               sucursal,
               "idsucursal",
               "nombre");
            ViewData["listasucursal"] = listasucursal;



            var estado = MantenimientoData.GetListarEstado((Int32)Constantes.MaestroTablas.Producto);
            var listadoestado = new SelectList(estado, "idestado", "estado");
            ViewData["listadoestado"] = listadoestado;


            return PartialView("_ModificarProductoInventario", model);
        }

        #endregion


       
    }
}