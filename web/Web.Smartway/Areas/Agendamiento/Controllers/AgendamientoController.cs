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
using Web.Smartway.DataAccess.Agendamiento;
using System.IO;
using Web.Smartway.DataAccess.Inventario;
using Web.Smartway.Areas.Inventario.Models;

namespace Web.Smartway.Areas.Agendamiento.Controllers
{
    public class AgendamientoController : BaseController
    {
        #region ActionResult 
        public ActionResult AtencionIncidencia()
        {
            ViewData["listatipoincidencia"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.TipoIncidencia);
            ViewData["listatiposolucion"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.TipoSolucion);
            return View();
        }
        public ActionResult RegistroNuevaIncidencia(IncidenciaModel model)
        {
            Session["DetalleComprobanteModel"] = null;
            var perfiles = Usuario.Perfiles;
            #region autorizacion 
            var autorizar = perfiles.Where(x => x.IdPerfil.Equals
                         (Convert.ToInt32(Constantes.Perfil.Admin))).SingleOrDefault();

            if (autorizar != null)
            {
                var sucursal = new SucursalData().ListarSucursal("", "", null, Usuario.idpartner);
                var listasucursal = new SelectList(
                   sucursal,
                   "idsucursal",
                   "nombre");
                ViewData["listasucursal"] = listasucursal;
                model.editarsucursal = true;
                model.idsucursal = Usuario.idsucursal;
                model.idpartner = Usuario.idpartner;
            }
            else
            {
                model.idpartner = Usuario.idpartner;
                model.idsucursal = Usuario.idsucursal;
            }
            #endregion

            ViewData["ListaTipoComprobante"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.TipoDocumentoCompra);
            ViewData["ListaCondicionReclamo"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.CondicionReclamo);
            ViewData["ListaTipoDocumento"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.TipoDocumento);
            ViewData["ListaTipoRequerimiento"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.RequerimientoCliente);

            var falla = new FallaData().listarFalla(null, null);
            var listafalla = new SelectList(falla, "idfalla", "descripcion");
            ViewData["listafalla"] = listafalla;    // MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.Sintoma);

            var tipoproducto = new ProductoData().listarTipoProducto();
            var listatipoproducto = new SelectList(
                 tipoproducto
                , "idtipoproducto"
                , "nombre"
                );
            ViewData["listatipoproducto"] = listatipoproducto;

            var producto = new ProductoData().listarProducto("", "", null, null, null, false);
            var listaproducto = new SelectList(producto, "idproducto", "descripcionlarga");
            ViewData["listaproducto"] = listaproducto;
  
            var partners = new PartnerData().ListarPartner(null, null);
            var listapartners = new SelectList(
                 partners
                , "idpartner"
                , "razonsocial"
                );
            ViewData["listapartner"] = listapartners;
            model.fechahoraregistro = DateTime.Now;

            #region RedireccionPantallas

            if (model.idtiposolucion == (Int32)Constantes.TipoSolucion.LibroReclamaciones)
            {
                model.libroactivo = true;
            }
            model.editar = true;
            if (model.engarantia)
            {
                model.incidenciagarantia = true;
                return View("IncidenciaGarantia", model);
            }
            else
            {
                model.incidenciagarantia = false;
                return View("IncidenciaSinGarantia", model);
            }
            #endregion RedireccionPantallas
        }
        public ActionResult SeguimientoIncidencias()
        {
            ViewData["listatipoincidencia"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.TipoIncidencia);

            var sucursal = new SucursalData().ListarSucursal("", "", null);
            var listasucursal = new SelectList(
               sucursal,
               "idsucursal",
               "nombre");
            ViewData["listasucursal"] = listasucursal;

            var tipoproducto = new ProductoData().listarTipoProducto();
            var listatipoproducto = new SelectList(
                 tipoproducto
                , "idtipoproducto"
                , "nombre"
                );
            ViewData["listatipoproducto"] = listatipoproducto;

            var clientes = MantenimientoData.GetListarClientes("", true);
            var listaclientes = new SelectList(
             clientes
            , "idcliente"
            , "nombre"
            );
            ViewData["listacliente"] = listaclientes;

            return View();
        }
        public ActionResult VerIncidencia(long idincidencia)
        {


            var model = new IncidenciaData().ObtenerIncidencia(idincidencia);

            model.editar = false;
            model.direccion = model.direccioncliente;

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
                //model.idsucursal = Usuario.idsucursal;

            }
            if (!model.idincidencia.HasValue)
            {
                model.idpartner = Usuario.idpartner;
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

            var producto = new ProductoData().listarProducto("", "", null, null, null, false);
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

            if (model.ideva.HasValue)
                model.evaluacionrealizada = true;
            else
                model.evaluacionrealizada = false;

            //if (model.idcoti.HasValue)
            //    model.cotizacionrealizada = true;
            //else
            //    model.cotizacionrealizada = false;

            if (model.incidenciagarantia)
            {
                return View("IncidenciaGarantia", model);
            }
            else
            {
                return View("IncidenciaSinGarantia", model);
            }
        }
        public ActionResult EstadoFisico(long idincidencia)
        {
            Session["idincidencia"] = idincidencia;
            var model = new IncidenciaData().ObtenerIncidencia(idincidencia);

            var modSucursal = new SucursalData().obtenerSucursal(model.idsucursal);

            model.ListaAccesorios = GetListaAccesorios();

            if (model.accesorios != null)
                model.AccesoriosSeleccionados = model.accesorios.Split(',').ToArray();
            ViewData["ListaEstadosFiProducto"] = MantenimientoData.GetListarValoresxTabla(Convert.ToInt32(Constantes.MaestroTablas.TipoDano));

            var sucursal = new SucursalData().ListarSucursal("", "", null, (Int32)Constantes.Partner.Smartway).Where(x => x.reparacion);
            var listasucursal = new SelectList(
               sucursal,
               "idsucursal",
               "nombre");


            model.reparadoensucursal = modSucursal.reparacion;
            model.sucursaldelivery = modSucursal.delivery;

            ViewData["listasucursal"] = listasucursal;

            var direccion = MantenimientoData.GetListarDireccionesxCliente(model.idcliente);
            var listadirecciones = new SelectList(direccion, "iddireccion", "direccion");
            ViewData["listadireccion"] = listadirecciones;

            return View(model);
        }
        #endregion


        #region Documento del cliente
        public PartialViewResult AgregarDocumentoModal()
        {

            ViewData["ListaTipoComprobante"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.TipoDocumentoCompra);
            return PartialView("_AgregarDocumentoCliente");
        }
        [HttpPost]
        public JsonResult AgregarDocumentoModal(ComprobanteModel model)
        {
            var documentocompra = new ComprobanteModel();


            documentocompra.fechaemision = model.fechaemision;
            documentocompra.idtipodocumentocompra = model.idtipodocumentocompra;
            documentocompra.numerocomprobante = model.numerocomprobante;


            Session["ComprobanteCliente"] = documentocompra;

            return Json(new
            {
                documentocompra.fechaemision,
                idtipodocumento = documentocompra.idtipodocumentocompra,
                documentocompra.numerocomprobante
            });


        }
        #endregion

        #region Busqueda de cliente
        public PartialViewResult BuscarPersonaModal()
        {
            ViewData["ListaTipoDocumento"] = MantenimientoData.GetListarValoresxTabla(Convert.ToInt32(Constantes.MaestroTablas.TipoDocumento));
            return PartialView("_BuscarPersonaModal");
        }
        public JsonResult JsonGetListarClientes(int? tDocumento, string numDocumento, string sord, int page, int rows)
        {
            if (tDocumento == null)
                if (numDocumento == "")
                    return Json(new { res = false });


            var listadoTotal = MantenimientoData.GetListarClientes(numDocumento, true, tDocumento).ToList();
            var resjson1 = (new JqGridExtension<ClienteModel>()).DataBind(listadoTotal, listadoTotal.Count);
            return resjson1;
        }
        public PartialViewResult EditarClienteModal(int id)
        {
            var model = new ClienteModel();

            var ubigeos = GetListarUbigeo_Cache();
            var listaUbigeos = new SelectList(
             ubigeos,
             "iddistrito",
             "ubigeo");
            ViewData["listaubigeos"] = listaUbigeos;

            ViewData["ListaTipoDocumento"] = MantenimientoData.GetListarValoresxTabla(Convert.ToInt32(Constantes.MaestroTablas.TipoDocumento));
            ViewData["ListaMoneda"] = MantenimientoData.GetListarValoresxTabla(Convert.ToInt32(Constantes.MaestroTablas.Moneda));
            ViewData["ListaSexo"] = MantenimientoData.GetListarValoresxTabla(Convert.ToInt32(Constantes.MaestroTablas.Sexo));

            var ocliente = ClienteData.GetObtenerCliente(id);

            model.activo = true;
            model.idcliente = ocliente.idcliente;
            model.iddireccion = ocliente.iddireccion;
            model.idubigeo = ocliente.idubigeo;

            model.nombrecorto = ocliente.nombrecorto;
            model.nombre = ocliente.nombre;
            model.numerodocumento = ocliente.numerodocumento;
            model.ubigeo = ocliente.ubigeo;
            model.direccion = ocliente.direccion;
            model.codigodireccion = ocliente.codigo;
            model.iddistrito = ocliente.idubigeo;
            model.idtipodocumento = ocliente.idtipodocumento;
            model.celular = ocliente.celular;
            model.telefono = ocliente.telefono;
            model.email = ocliente.email;
            model.idsexo = ocliente.idsexo;

            return PartialView("_EditarClienteModal", model);
        }
        public PartialViewResult AgregarClienteModal()
        {
            var ubigeos = GetListarUbigeo_Cache();
            var listaUbigeos = new SelectList(
             ubigeos,
             "iddistrito",
             "ubigeo");
            ViewData["listaubigeos"] = listaUbigeos;

            ViewData["ListaMoneda"] = MantenimientoData.GetListarValoresxTabla(Convert.ToInt32(Constantes.MaestroTablas.Moneda));

            ViewData["ListaTipoDocumento"] = MantenimientoData.GetListarValoresxTabla(Convert.ToInt32(Constantes.MaestroTablas.TipoDocumento));
            ViewData["ListaSexo"] = MantenimientoData.GetListarValoresxTabla(Convert.ToInt32(Constantes.MaestroTablas.Sexo));

            return PartialView("_AgregarClienteModal");
        }
        #endregion





        #region RegistroActualización Incidencia
        [HttpPost]
        public JsonResult RegistrarNuevaIncidenciaSinReclamo(IncidenciaModel modelo)
        {
            var respuesta = string.Empty;
            modelo.idusuarioregistro = Usuario.Idusuario;
            modelo.fechaemision = DateTime.Now;
            modelo.fechahoraregistro = DateTime.Now;
            modelo.atendidaxcallcenter = false;
            modelo.idestado = (Int32)Constantes.EstadoIncidencia.EnProceso;
            modelo.idsucursal = Usuario.idsucursal;

            modelo.__tipooperacion = 1; //insertar

            var producto = new ProductoData().obtenerProducto(modelo.idproducto);

            var result = new IncidenciaData().insertarActualizarIncidencia(modelo);
            var numero_incidencia = new IncidenciaData().ObtenerIncidencia(result.idincidencia.Value);

            if (result == null)
            {
                ModelState.AddModelError("", respuesta);
                return Json(new { res = false, Errors = ModelState.Errors() });
            }
            else
            {
                return Json(new
                {
                    engarantia = modelo.engarantia,
                    res = true,
                    incidencia = result.idincidencia,
                    num_incidencia = numero_incidencia.anioincidencia + "-" + numero_incidencia.numeroincidencia
                });
            }




        }
        [HttpPost]
        public JsonResult RegistrarNuevaIncidencia(IncidenciaModel modelo)
        {
            var respuesta = string.Empty;
            modelo.idusuarioregistro = Usuario.Idusuario;
            modelo.fechahoraregistro = DateTime.Now;
            modelo.atendidaxcallcenter = false;
            modelo.idestado = (Int32)Constantes.EstadoIncidencia.EnProceso;
            modelo.idsucursal = Usuario.idsucursal;
            modelo.idproducto = Convert.ToInt32(modelo.ItemIncidencia);

            ///////Registrado previamente
            if (modelo.iddocumentocompra != null)
            {
                var detallecomprobante = FacturacionData.GetListarDetalleComprobante(modelo.iddocumentocompra).ToList();
                var hoy = DateTime.Now.Date;
                var fechareparacion = detallecomprobante[0].fechaemision;
                modelo.fechaemision = fechareparacion;
                modelo.idsucursalventa = detallecomprobante[0].idsucursalventa;
                var periodo = Convert.ToInt16(ConfigurationManager.AppSettings["PeriodoGarantiaReparacion"]);
                modelo.idtipogarantia = (int)Constantes.TipoGarantia.Reparacion;
                modelo.periodogarantia = periodo;
                if ((hoy - fechareparacion).TotalDays > periodo)
                    modelo.engarantia = false;
                else
                    modelo.engarantia = true;
            }
            else 
            {
                var detalle_aux = (DetalleComprobanteModel)Session["DetalleComprobanteModel"];
                var detalledocumentocompra = new DetalleComprobanteModel();
                var documentocompra = (ComprobanteModel)Session["ComprobanteCliente"];

                documentocompra.idconceptofacturacion = (Int16)(Constantes.ConceptoFacturacion.Venta);
                documentocompra.ventapartner = true;
                documentocompra.idusuarioregistro = Usuario.Idusuario;
                documentocompra.idcliente = modelo.idcliente;
                documentocompra.ventaenlinea = false;
                documentocompra.total = 0;
                documentocompra.subtotal = 0;
                documentocompra.igv = 0;
                documentocompra.idestado = (Int16)(Constantes.EstadoFacturacion.Facturado);
                documentocompra.idpartner = modelo.idpartner;
                documentocompra.idsucursalventa = modelo.idsucursalventa;
                documentocompra.fechahoraregistro = DateTime.Now;

                modelo.iddocumentocompra = new FacturacionData().insertarActualizarComprobanteCliente(documentocompra);
                modelo.fechaemision = documentocompra.fechaemision;
            
                detalledocumentocompra.cantidad = 1;
                detalledocumentocompra.idproducto = modelo.idproducto;
                detalledocumentocompra.iddocumentocompra = modelo.iddocumentocompra;
                detalledocumentocompra.total = detalle_aux.total;
                detalledocumentocompra.igv = detalle_aux.igv;
                detalledocumentocompra.imei = detalle_aux.imei;
                detalledocumentocompra.serie = detalle_aux.serie;
                var iddetalledocumento = new FacturacionData().insertarActualizarDetalleComprobanteCliente(detalledocumentocompra);
            }

                // Evaluar si garantia DAP 

                var producto = new ProductoData().obtenerProducto(modelo.idproducto);
                var garantias = new IncidenciaData()
                    .ListarEvaluarGarantia(producto.idtipoproducto.Value
                    , producto.idfabricante.Value
                    , modelo.idpartner
                    ).ToList();

                if (garantias != null && garantias.ToList().Count != 0)
                {

                    //Dar prioridad a la garantia DAP
                    //
                    var dap = AgendamientoData.EvaluarGarantia(DateTime.Now.Date
                            , modelo.fechaemision.Value
                            , garantias.Where(x => x.idtipogarantia.Equals((Int16)Constantes.TipoGarantia.DAP)).SingleOrDefault());

                    var garantia_cliente = AgendamientoData.EvaluarGarantia(DateTime.Now.Date
                        , modelo.fechaemision.Value
                        , garantias.Where(x => x.idtipogarantia.Equals((Int16)Constantes.TipoGarantia.Cliente)).SingleOrDefault());

                    if (dap)
                    {
                        modelo.idtipogarantia = (int)Constantes.TipoGarantia.DAP;
                        modelo.periodogarantia = garantias.Where(x => x.idtipogarantia.Equals((Int16)Constantes.TipoGarantia.DAP)).Single().periodo;
                        modelo.engarantia = true;
                        modelo.requiereevaluacion = true;
                    }
                    else if (garantia_cliente)
                    {
                        modelo.idtipogarantia = (int)Constantes.TipoGarantia.Cliente;
                        modelo.periodogarantia = garantias.Where(x => x.idtipogarantia.Equals((Int16)Constantes.TipoGarantia.Cliente)).Single().periodo;
                        modelo.engarantia = true;
                        modelo.requiereevaluacion = true;
                    }
                    else
                    {
                        modelo.idtipogarantia = (int)Constantes.TipoGarantia.Cliente;
                        modelo.periodogarantia = garantias.Where(x => x.idtipogarantia.Equals((Int16)Constantes.TipoGarantia.Cliente)).Single().periodo;
                        modelo.engarantia = false;
                        modelo.requiereevaluacion = false;
                    }
                }
                else
                {
                    //modelo.idtipogarantia = (int)Constantes.TipoGarantia.Cliente;
                    modelo.periodogarantia = 0;
                    modelo.engarantia = false;
                    modelo.requiereevaluacion = false;
                }
            

            try
            {
                var detalle_aux = (DetalleComprobanteModel)Session["DetalleComprobanteModel"];

                modelo.__tipooperacion = 1; // Actualizacion y Agregacion general
                modelo.idetapa = (Int32)Constantes.Etapa.Registro;
                modelo.activo = true;
                modelo.serie = detalle_aux.serie;
                modelo.imei = detalle_aux.imei;
                modelo.idproducto = detalle_aux.idproducto;
                var result = new IncidenciaData().insertarActualizarIncidencia(modelo);

                return Json(new
                {
                    engarantia = modelo.engarantia,
                    res = true,
                    incidencia = result.idincidencia,
                    num_incidencia = result.numeroincidencia,

                });
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", ex.InnerException.ToString());
                return Json(new { res = false, Errors = ModelState.Errors() }, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region Dropdownlist

        [HttpPost]
        public JsonResult cargarProductos(int idtipoproducto, int idfabricante)
        {
            var productos = new ProductoData().listarProducto("", "", idtipoproducto, null, idfabricante, false);
            var listaproductos = new SelectList(productos, "idproducto", "descripcionlarga");

            return Json(listaproductos);
        }
        [HttpPost]
        public JsonResult JsonListarSucursales(int idpartner)
        {
            var sucursal = new SucursalData().ListarSucursal("", "", null, idpartner);
            var listadosucursales = new SelectList(sucursal, "idsucursal", "nombre");


            return Json(listadosucursales);
        }

        #endregion 


       
 
     
     
        [HttpPost]
        public JsonResult AgregarClienteModal(ClienteModel Modelo)
        {
            var respuesta = string.Empty;
            //Modelo.idproveedor = Usuario.Idusuario;
            //Modelo.activo = true;
            try
            {
                Modelo.__tipooperacion = 1;
                var cliente = ClienteData.InsertarActualizarCliente(Modelo, out respuesta);


                var jsonCliente = new
                {
                    idtipodocumento = Modelo.idtipodocumento,
                    numerodocumento = Modelo.numerodocumento,
                    nombre = Modelo.nombre,
                    direccion = Modelo.direccion,
                    email = Modelo.email,
                    telefono = Modelo.telefono,
                    celular = Modelo.celular,
                    idsexo = Modelo.idsexo,
                    idcliente = cliente,
                    res = true
                };
                return Json(jsonCliente);
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", ex.Message);
                return Json(new { res = false, msj = ex.Message });
            }
        }
        public List<ListarUbigeoDto> GetListarUbigeo_Cache()
        {
            var ubigeo = HttpContext.Cache.Get("Ubigeo") as List<ListarUbigeoDto>;
            if (HttpContext.Cache["Ubigeo"] == null)
            {
                ubigeo = MantenimientoData.GetListarUbigeo();
                HttpContext.Cache.Insert("Ubigeo", ubigeo, null, DateTime.Now.AddSeconds(1500), Cache.NoSlidingExpiration);
            }
            else
                ubigeo = (List<ListarUbigeoDto>)HttpContext.Cache["Ubigeo"];

            return ubigeo;
        }


        #region Incidencia


        #region Agregar Detalle Documento
        public PartialViewResult AgregarDetalleIncidenciaModal()
        {
            var productos = new ProductoData().listarProducto("", "", null, null, null, false);
            var listaProductos = new SelectList(
               productos,
               "idproducto",
               "descripcionlarga");
            ViewData["listaproductos"] = listaProductos;

            return PartialView("_NuevoProducto");
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


        [HttpPost]
        public JsonResult AgregarDetalleIncidencia(int? idproducto,string serie, string imei, decimal? precio, DateTime? fechaemision)
        {
            Session["DetalleComprobanteModel"] = null;
            var detalle = new DetalleComprobanteModel();

            var inventario = new InventarioData().obtenerProductoInventario(idproducto.Value, serie, imei);
            if (inventario != null)
            {
                if ((Int32)Constantes.EstadoProducto.NoDisponible != inventario.idestado)
                {
                    return Json(new
                    {
                        res = false,
                        msj = "El producto que intenta ingresar, está actualmente " +
                        "está dentro de un proceso de reparación."
                    });
                }
            }


        
            var producto = new ProductoData().obtenerProducto(idproducto.Value);

            detalle.cantidad = 1;
            detalle.codigoproducto = producto.codigoproducto;
            detalle.descripcionlarga = producto.descripcionlarga;
            detalle.total = precio;
            detalle.serie = serie;
            detalle.imei = imei;
            detalle.idproducto = idproducto.Value;


            Session["DetalleComprobanteModel"] = detalle;

            return Json(new { res = true });
        }
        [HttpPost]
        public JsonResult validarSerieIME(int idproducto)
        {

            var model = new ProductoData().obtenerProducto(idproducto);
            int serie = 0, imei = 0, serieimei = 0;

            switch (model.idrequisitoascanear)
            {
                case (Int32)Constantes.Scaneo.IMEI:
                    imei = 1;
                    break;
                case (Int32)Constantes.Scaneo.Serie:
                    serie = 1;
                    break;
                case (Int32)Constantes.Scaneo.SerieIMEI:
                    serieimei = 1;
                    break;
                default:
                    break;
            }
            var jsonresult = new
            {
                serie = serie.ToString(),
                imei = imei.ToString(),
                serieimei = serieimei.ToString()

            };

            return Json(jsonresult);
        }

        #endregion  

       


        [HttpPost]
        public JsonResult JsonGetListarIncidencia(string numeroincidencia
            , string numerodocumento
            , string fechainicio
            , string fechafin)
        {

            if (String.IsNullOrEmpty(numeroincidencia)) numeroincidencia = null;
            if (String.IsNullOrEmpty(numerodocumento)) numerodocumento = null;
            if (String.IsNullOrEmpty(fechainicio)) fechainicio = null;
            if (String.IsNullOrEmpty(fechafin)) fechafin = null;


            var listadoTotal = new IncidenciaData().ListarIncidencias(numeroincidencia, numerodocumento, fechainicio, fechafin).ToList();
            var resjson1 = (new JqGridExtension<IncidenciaModel>()).DataBind(listadoTotal, listadoTotal.Count);
            return resjson1;
        }

     

        #endregion




        #region estadofisico 
      
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
        public JsonResult RegistrarEstadoFisico(IncidenciaModel model)
        {

            int idEstadoOrdenServicio;

            if (model.AccesoriosSeleccionados != null)
            {
                var modEstadoFisico = new EstadoFisicoModel();
                modEstadoFisico.idincidencia = model.idincidencia.Value;
                modEstadoFisico.idsaccesorios = string.Join(",", model.AccesoriosSeleccionados);
                new AgendamientoData().insertarActualizarAccesorioIncidencia(modEstadoFisico);
            }
            var modIncidencia = new IncidenciaData().ObtenerIncidencia(model.idincidencia.Value);
            modIncidencia.__tipooperacion = 5;// cambiar estado
            modIncidencia.idestado = (int)(Constantes.EstadoIncidencia.Cerrada);
            modIncidencia.idetapa = (int)(Constantes.Etapa.EstadoFisico);

            if (model.idsucursalreparacion.HasValue)
            {
                modIncidencia.idsucursalreparacion = model.idsucursalreparacion;
                modIncidencia.idsucursaldestino = model.idsucursalreparacion;
                idEstadoOrdenServicio = (Int32)Constantes.EstadoOrdenServicio.PendienteDespacho;
            }
            else
            {
                modIncidencia.idsucursalreparacion = modIncidencia.idsucursal;
                idEstadoOrdenServicio = (Int32)Constantes.EstadoOrdenServicio.PendienteAsignacionTecnico;
            }

            modIncidencia.iddirecciondelivery = model.iddirecciondelivery;

            var result = new IncidenciaData().insertarActualizarIncidencia(modIncidencia);
          


            var ModInventario = new InventarioModel();
            ModInventario.cantidad = 1;
            ModInventario.fechahoraregistro = DateTime.Now;
            //almacen principal
            var objAlmacen = InventarioData.GetListarAlmacen(modIncidencia.idsucursal, "001").FirstOrDefault();
            ModInventario.idalmacen = objAlmacen.idalmacen.Value;
            ModInventario.iddocumentorecepcion = 0;
            ModInventario.idestado = (Int32)Constantes.Producto.PendienteReparar;
            ModInventario.idproducto = modIncidencia.idproducto;
            ModInventario.idusuarioregistro = Usuario.Idusuario;
            ModInventario.imei = modIncidencia.imei;
            ModInventario.serie = modIncidencia.serie;
            ModInventario.__idoperacion = 1;
            ModInventario.idinventario =   new InventarioData().InsertarActualizarInventario(ModInventario);

            #region Para ordenes que se atienden en la misma localidad
            if (modIncidencia.idsucursal == modIncidencia.idsucursaldestino.Value)
            {
                idEstadoOrdenServicio = (Int32)Constantes.EstadoOrdenServicio.PendienteAsignacionTecnico;
                //modOrdenServicio.__tipooperacion = 2;
                //new OrdenServicioData().InsertarActualizarOrdenServicio(modOrdenServicio);
            }
            #endregion

            var modOrdenServicio = GenerarOrdenServicio(model.idincidencia.Value, idEstadoOrdenServicio, modIncidencia);

        

            return Json(new { res = true, idordenservicio = modOrdenServicio.idordenserviciotecnico, numeroordenservicio = modOrdenServicio.numeroordenservicio });
        }
        [HttpPost]
        public JsonResult SaveImage(long? id, string imageData, string imageData2, string imageData3, string imageData4,
            string imageData5, string imageData6)
        {
            long idincidencia = id.Value;
            var modIncidencia = new IncidenciaModel();
            modIncidencia.__tipooperacion = 6;
            modIncidencia.idincidencia = idincidencia;

            modIncidencia.partedelantera = Convert.FromBase64String(imageData);
            modIncidencia.parteposterior = Convert.FromBase64String(imageData2);
            modIncidencia.partesuperior = Convert.FromBase64String(imageData3);
            modIncidencia.parteinferior = Convert.FromBase64String(imageData4);
            modIncidencia.parteizquierda = Convert.FromBase64String(imageData6);
            modIncidencia.partederecha = Convert.FromBase64String(imageData5);

            string Pic_Path = HttpContext.Server.MapPath("/Images/" + idincidencia + "/Delantera.png");
            SaveNewImage(imageData, idincidencia, Pic_Path);


            Pic_Path = HttpContext.Server.MapPath("/Images/" + idincidencia + "/Posterior.png");
            SaveNewImage(imageData2, idincidencia, Pic_Path);

            Pic_Path = HttpContext.Server.MapPath("/Images/" + idincidencia + "/Superior.png");
            SaveNewImage(imageData3, idincidencia, Pic_Path);

            Pic_Path = HttpContext.Server.MapPath("/Images/" + idincidencia + "/Inferior.png");
            SaveNewImage(imageData4, idincidencia, Pic_Path);

            Pic_Path = HttpContext.Server.MapPath("/Images/" + idincidencia + "/LateralDerecho.png");
            SaveNewImage(imageData5, idincidencia, Pic_Path);

            Pic_Path = HttpContext.Server.MapPath("/Images/" + idincidencia + "/LateralIzquierdo.png");
            SaveNewImage(imageData6, idincidencia, Pic_Path);

            var result = new IncidenciaData().insertarActualizarIncidencia(modIncidencia);


            return Json(new { res = true });
        }
        private void SaveNewImage(string imageData, long idincidencia, string Pic_Path)
        {
            string ruta = Path.GetDirectoryName(Pic_Path);

            //if (!System.IO.Directory.Exists(ruta))
            //{
            //        DirectoryInfo di = System.IO.Directory.CreateDirectory(ruta);
            //        using (FileStream fs = new FileStream(@Pic_Path, FileMode.Create))
            //        {
            //            using (BinaryWriter bw = new BinaryWriter(fs))
            //            {
            //                byte[] data = Convert.FromBase64String(imageData);
            //                bw.Write(data);
            //                bw.Close();


            //        }
            //        }
            //}
            //else
            //{
            //    using (FileStream fs = new FileStream(@Pic_Path, FileMode.Create))
            //    {
            //        using (BinaryWriter bw = new BinaryWriter(fs))
            //        {
            //            byte[] data = Convert.FromBase64String(imageData);
            //            bw.Write(data);
            //            bw.Close();

            //        }
            //    }
            //}


        }
        #endregion

        #region comprobantecliente



        public PartialViewResult BuscarDocumentoModal()
        {
            ViewData["ListaTipoComprobante"] = MantenimientoData.GetListarValoresxTabla(Convert.ToInt32(Constantes.MaestroTablas.TipoDocumentoCompra));
            ViewData["ListaTipoDocumento"] = MantenimientoData.GetListarValoresxTabla(Convert.ToInt32(Constantes.MaestroTablas.TipoDocumento));

            return PartialView("_BuscarDocumentoModal");
        }

        public JsonResult JsonGetDetalleComprobante(long? iddocumentocompra)
        {
            bool resultado = false;
            try
            {

                if (iddocumentocompra == null)
                {
                    if (Session["DetalleComprobanteModel"] != null)
                    {
                        var detalle = (DetalleComprobanteModel)Session["DetalleComprobanteModel"];
                        var listado = new List<DetalleComprobanteModel>();
                        listado.Add(detalle);
                        return (new JqGridExtension<DetalleComprobanteModel>()).DataBind(listado, listado.Count);
                    }

                }
                var listadoTotal = FacturacionData.GetListarDetalleComprobante(iddocumentocompra).ToList();
                Session["DetalleComprobanteModel"] = listadoTotal.FirstOrDefault();
                //var producto = new ProductoData().obtenerProducto(listadoTotal[0].idproducto);
                //aca es por cada producto , actualmente solo funciona para uno. //OJO
                return (new JqGridExtension<DetalleComprobanteModel>()).DataBind(listadoTotal, listadoTotal.Count);

            }
            catch (Exception ex)
            {
                return Json(new { res = resultado }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult JsonGetListarDocumentos(int? idTipoDocumento, string numeroDocumento, int? idTipoComprobante, string numeroComprobante, string sord, int page, int rows)
        {
            var listadoTotal = FacturacionData.GetListarComprobante(null, numeroComprobante, idTipoComprobante).ToList();




            return (new JqGridExtension<ComprobanteModel>()).DataBind(listadoTotal, listadoTotal.Count);

        }

        #endregion

        #region OrdenServicio
        public OrdenServicioModel GenerarOrdenServicio(long idincidencia, int idestado, IncidenciaModel ModIncidencia)
        {
            var modOrdenServicio = new OrdenServicioModel();
            var producto = new InventarioData().obtenerProductoInventario(ModIncidencia.idproducto
                 , ModIncidencia.serie
                 , ModIncidencia.imei
                 );
            
            modOrdenServicio.idinventario = producto.idinventario;
            modOrdenServicio.cambioproducto = false;
            modOrdenServicio.fechahoraregistro = DateTime.Now;
            modOrdenServicio.idestado = idestado;
            modOrdenServicio.idusuario = Usuario.Idusuario;
            modOrdenServicio.idcliente = ModIncidencia.idcliente;
            modOrdenServicio.idincidencia = idincidencia;
            modOrdenServicio.idtipoordenservicio = (Int32)Constantes.tipoordenservicio.ost;
            modOrdenServicio.activo = true;
            modOrdenServicio.cotizado = false;
            modOrdenServicio.idproducto = ModIncidencia.idproducto;
            modOrdenServicio.engarantia = ModIncidencia.engarantia;
            modOrdenServicio.serie = ModIncidencia.serie;
            modOrdenServicio.imei = ModIncidencia.imei;
            modOrdenServicio.idsucursaldestino = ModIncidencia.idsucursaldestino.Value;
            modOrdenServicio.idsucursalorigen = ModIncidencia.idsucursal;
            modOrdenServicio.iddirecciondelivery = ModIncidencia.iddirecciondelivery;
            if (modOrdenServicio.iddirecciondelivery != null)
                modOrdenServicio.delivery = true;
            else modOrdenServicio.delivery = false;

            return new OrdenServicioData().InsertarActualizarOrdenServicio(modOrdenServicio);
        }
        #endregion
        [HttpPost]
        public JsonResult ValidarProductoInventario(long iddocumentocompra)
        {
            var detallecomprobante = FacturacionData.GetListarDetalleComprobante(iddocumentocompra).FirstOrDefault();
            if (detallecomprobante == null)
            {
                return Json(new { res = true });
            }
            var inventario = new InventarioData().obtenerProductoInventario(detallecomprobante.idproducto, detallecomprobante.serie, detallecomprobante.imei);
            if (inventario != null)
                if ((Int32)Constantes.EstadoProducto.NoDisponible != inventario.idestado)
                {
                    return Json(new
                    {
                        res = false,
                        msj = "El producto que intenta ingresar, está actualmente " +
                        "está dentro de un proceso de reparación."
                    });
                }
            {
                return Json(new { res = true });
            }
        }

    }
}