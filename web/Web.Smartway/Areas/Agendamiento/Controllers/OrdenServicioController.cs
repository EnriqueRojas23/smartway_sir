using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.Common.Controllers;
using Web.Common.Extensions;
using Web.Smartway.Areas.Agendamiento.Models;
using Web.Smartway.Areas.Inventario.Models;
using Web.Smartway.Areas.Reparacion.Models;
using Web.Smartway.DataAccess;
using Web.Smartway.DataAccess.Agendamiento;
using Web.Smartway.DataAccess.Inventario;
using Web.Smartway.DataAccess.Mantenimiento;
using Web.Smartway.DataAccess.Reparaciones;
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
        public JsonResult AprobarDesaprobarCotizacion(long idcotizacion , string estado, long idordenservicio)
        {
            var model = new VentaCotizacionModel();
            var modOrdenServicio = new OrdenServicioData().obtenerOrdenServicio(idordenservicio);
            var modOrdenTrabajo = new OrdenTrabajoModel();
            

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



            return Json(new { res = true });

        }
    }
}