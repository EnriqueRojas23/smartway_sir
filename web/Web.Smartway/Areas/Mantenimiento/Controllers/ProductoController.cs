using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.Common.Controllers;
using Web.Common.Extensions;
using Web.Smartway.Areas.Mantenimiento.Models;
using Web.Smartway.DataAccess;
using Web.Smartway.DataAccess.Mantenimiento;

namespace Web.Smartway.Areas.Mantenimiento.Controllers
{
    public class ProductoController : BaseController
    {

        public ActionResult Producto()
        {
            ViewData["listamodelo"] = MantenimientoData.GetListarValoresxTabla(Convert.ToInt32(Constantes.MaestroTablas.Modelo));

            var fabricante = new PartnerData().ListarPartner(null, null);
            var listafabricante = new SelectList(
                 fabricante
                , "idpartner"
                , "razonsocial"
                );
            ViewData["listafabricante"] = listafabricante;

            var tipoproducto = new ProductoData().listarTipoProducto();
            var listatipoproducto = new SelectList(
                 tipoproducto
                , "idtipoproducto"
                , "nombre"
                );
            ViewData["listatipoproducto"] = listatipoproducto;

            return View();
        }
        public JsonResult JsonGetListarProducto(string codigo, string descripcion, int? idtipoproducto, int? idmodelo, int? idfabricante
            , string sidx, string sord, int page, int rows)
        {
            var listadoTotal = new ProductoData().listarProducto(codigo, descripcion, idtipoproducto, idmodelo, idfabricante, null).ToList();
            var resjson1 = (new JqGridExtension<ProductoModel>()).DataBind(listadoTotal, listadoTotal.Count);
            return resjson1;
        }

        public ActionResult NuevoProducto()
        {
            //var valorestabla = MantenimientoData.GetListarValoresxTabla(null).Where(x => x.activo == true).ToList();
            HtmlHelper.ClientValidationEnabled = true;

            var fabricante = new PartnerData().ListarPartner(null, null);
            var listafabricante = new SelectList(
                 fabricante
                , "idpartner"
                , "razonsocial"
                );
            ViewData["listafabricante"] = listafabricante;

            var tipoproducto = new ProductoData().listarTipoProducto();
            var listatipoproducto = new SelectList(
                 tipoproducto
                , "idtipoproducto"
                , "nombre"
                );
            ViewData["listatipoproducto"] = listatipoproducto;

            ViewData["listatipomercaderia"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.TipoMercaderia);
            ViewData["listavoltaje"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.Voltaje);
            ViewData["listaprocesador"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.Procesador);
            ViewData["listapantalla"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.Pantalla);
            ViewData["listabanda"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.Banda);
            ViewData["listacamaraposterior"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.CamaraPosterior);
            ViewData["listacamarafrontal"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.CamaraFrontal);
            ViewData["listamemoriaflash"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.MemoriaFlash);
            ViewData["listamemoriaram"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.MemoriaRam);
            ViewData["listaso"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.SistemaOperativo);
            ViewData["listacapacidad"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.Capacidad);
            ViewData["listascanear"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.Scanear);
            ViewData["listatipoog"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.TipoOG);
            ViewData["listaorigen"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.Origen);
            ViewData["listafamilia"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.Familia);
            ViewData["listamodelo"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.Modelo);
            ViewData["listacolor"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.Color);
            ViewData["listamoneda"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.Moneda);

            var sino = new Dictionary<bool, string>();
            sino.Add(false, "No");
            sino.Add(true, "Si");

            var listasino = new SelectList(sino, "Key", "Value");

            ViewData["listasino"] = listasino;


            return View();
        }

        public ActionResult EditarProducto(int idproducto)
        {
            HtmlHelper.ClientValidationEnabled = true;

            var modProducto = new ProductoData().obtenerProducto(idproducto);


            var fabricante = new PartnerData().ListarPartner(null, null);
            var listafabricante = new SelectList(
                 fabricante
                , "idpartner"
                , "razonsocial"
                );
            ViewData["listafabricante"] = listafabricante;

            var tipoproducto = new ProductoData().listarTipoProducto();
            var listatipoproducto = new SelectList(
                 tipoproducto
                , "idtipoproducto"
                , "nombre"
                );
            ViewData["listatipoproducto"] = listatipoproducto;

            ViewData["listatipomercaderia"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.TipoMercaderia);
            ViewData["listavoltaje"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.Voltaje);
            ViewData["listaprocesador"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.Procesador);
            ViewData["listapantalla"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.Pantalla);
            ViewData["listabanda"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.Banda);
            ViewData["listacamaraposterior"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.CamaraPosterior);
            ViewData["listacamarafrontal"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.CamaraFrontal);
            ViewData["listamemoriaflash"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.MemoriaFlash);
            ViewData["listamemoriaram"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.MemoriaRam);
            ViewData["listaso"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.SistemaOperativo);
            ViewData["listacapacidad"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.Capacidad);
            ViewData["listascanear"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.Scanear);
            ViewData["listatipoog"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.TipoOG);
            ViewData["listaorigen"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.Origen);
            ViewData["listafamilia"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.Familia);
            ViewData["listamodelo"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.Modelo);
            ViewData["listacolor"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.Color);
            ViewData["listamoneda"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.Moneda);

            var sino = new Dictionary<bool, string>();
            sino.Add(false, "No");
            sino.Add(true, "Si");

            var listasino = new SelectList(sino, "Key", "Value");

            ViewData["listasino"] = listasino;

            return View(modProducto);
        }

        [HttpPost]
        public JsonResult RegistrarActualizarProducto(ProductoModel model)
        {
            model.activo = true;
            model.__tipooperacion = 1;

            if (model.idtipomercaderia == (Int32)Constantes.TipoMercaderia.Producto)
                model.repuesto = false;
            else model.repuesto = true;

            new ProductoData().InsertarActualizarProducto(model);

            return Json(new { res = true });
        }
        [HttpPost]
        public JsonResult EliminarProducto(int idproducto)
        {
            var modProducto = new ProductoModel();
            modProducto.idproducto = idproducto;
            modProducto.activo = false;
            modProducto.__tipooperacion = 2;

            new ProductoData().InsertarActualizarProducto(modProducto);

            return Json(new { res = true });
        }

        public PartialViewResult ModelAsociarReparacion(int idrepuesto)
        {
            var modRepuestoReparacion = new RepuestoxReparacionModel();
            //modRepuestoReparacion.ListaRepuestos = IEnumerable<SelectListItem>
            var reparaciones =   new ProductoData().listarRepuestoxReparacion(null);
            var seleccionados = new ProductoData().listarRepuestoxReparacion(idrepuesto).ToList();
            string[] string_seleccionados = new string[seleccionados.Count];
            for (int i = 0; i < seleccionados.Count; i++)
            {
                string_seleccionados[i] = seleccionados[i].idreparacion.ToString();
            }
            var listadoreparacion = new SelectList(reparaciones, "idreparacion", "descripcion");
            modRepuestoReparacion.ListaRepuestos = listadoreparacion.AsEnumerable();
            modRepuestoReparacion.RepuestosSeleccionados = string_seleccionados;

            return PartialView("_RepuestoReparacion", modRepuestoReparacion);

        }
        public PartialViewResult ModelAsociarRepuestoaProducto(int idproducto)
        {
            var modRepuestoReparacion = new ProductoxRepuestoModel();
            //modRepuestoReparacion.ListaRepuestos = IEnumerable<SelectListItem>
            var reparaciones = new ProductoData().listarProducto("","",null,null,null,true);
            var seleccionados = new ProductoData().listarRepuestosxProducto(idproducto).ToList();
            string[] string_seleccionados = new string[seleccionados.Count];
            for (int i = 0; i < seleccionados.Count; i++)
            {
                string_seleccionados[i] = seleccionados[i].idrepuesto.ToString();
            }
            var listadoreparacion = new SelectList(reparaciones, "idproducto", "descripcionlarga");
            modRepuestoReparacion.ListaRepuestos = listadoreparacion.AsEnumerable();
            modRepuestoReparacion.RepuestosSeleccionados = string_seleccionados;
            modRepuestoReparacion.idproducto = idproducto;

            return PartialView("_VincularProductoRepuestoModal", modRepuestoReparacion);

        }

        [HttpPost]
        public JsonResult RegistrarReparaciones(string repuestos, int idrepuesto)
        {
            string[] items = repuestos.Split(',');

            var modelos =new  List<RepuestoxReparacionModel>();
            foreach (var item in items)
            {
                modelos.Add(new RepuestoxReparacionModel { idrepuesto = idrepuesto, idreparacion = Convert.ToInt32(item) });
            }
            new ProductoData().insertarActualizarReparacionRepuesto(modelos, idrepuesto);
            return Json(new { res = true });
        }
        [HttpPost]
        public JsonResult RegistrarRepuestos(string repuestos, int? idproducto)
        {
            string[] items = repuestos.Split(',');

            var modelos = new List<ProductoxRepuestoModel>();
            foreach (var item in items)
            {
                modelos.Add(new ProductoxRepuestoModel { idproducto = idproducto.Value,  idrepuesto = Convert.ToInt32(item) });
            }
            new ProductoData().insertarActualizarRepuestoxProducto(modelos, idproducto.Value);
            return Json(new { res = true });
        }
    }
}
