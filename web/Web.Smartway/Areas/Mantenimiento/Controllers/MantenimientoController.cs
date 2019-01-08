using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using System.Web.UI.WebControls;

//using Web.Common.HtmlHelpers;

namespace Web.Smartway.Areas.Mantenimiento.Controllers
{
    using log4net;
    using QueryContracts.Smartway.Mantenimiento.Results;
    using System.Reflection;
    using System.Web.Caching;
    using Web.Common.Controllers;
    using Web.Common.Extensions;
    using Web.Smartway.Areas.Inventario.Models;
    using Web.Smartway.Areas.Mantenimiento.Models;
    using Web.Smartway.DataAccess;
    using Web.Smartway.DataAccess.Inventario;
    using Web.Smartway.DataAccess.Mantenimiento;

    public class MantenimientoController : BaseController 
    {
        private const string LISTAMAESTROTABLA = "ListaMaestroTabla";

        // GET: /Mantenimiento/Mantenimiento/
        private const string LISTARDIRECCIONES = "ListaDirecciones";

        private const string LISTAMONEDA = "ListaMoneda";
        private const string LISTAPROVEEDOR = "ListaProveedor";

        #region ValorTabla

        public ActionResult ValorTabla()
        {
            var maestrotablas = DataAccess.Mantenimiento.MantenimientoData.GetListarMaestroTabla().OrderBy(x=>x.tabla);
            var listamaestrotablas = new SelectList(
                maestrotablas,
                "idmaestrotabla",
                "tabla");
            ViewData[LISTAMAESTROTABLA] = listamaestrotablas;

            return View();
        }

        [HttpPost]
        public JsonResult JsonGetListarValorTabla(int? idMaestroTabla, string valor)
        {
            if (idMaestroTabla == null) idMaestroTabla = 0;
            var draw = Request.Form.GetValues("draw").FirstOrDefault();
            var start = Request.Form.GetValues("start").FirstOrDefault();
            var length = Request.Form.GetValues("length").FirstOrDefault();
            var sortColumn = Request.Form.GetValues("columns[" + Request.Form.GetValues("order[0][column]").FirstOrDefault() + "][name]").FirstOrDefault();
            var sortColumnDir = Request.Form.GetValues("order[0][dir]").FirstOrDefault();
            var searchValue = Request.Form.GetValues("search[value]").FirstOrDefault();

            var listado = MantenimientoData.GetListarValoresxTabla(idMaestroTabla, valor);

            if (sortColumn != "" && sortColumnDir != "")
            {
                if (sortColumnDir.ToUpper() == "DESC")
                {
                    var parametro = sortColumn;
                    var propertyInfo = typeof(ListarValorxTablaDto).GetProperty(parametro);
                    listado = listado.OrderByDescending(x => propertyInfo.GetValue(x, null)).ToList();
                }
                else
                {
                    var parametro = sortColumn;
                    var propertyInfo = typeof(ListarValorxTablaDto).GetProperty(parametro);
                    listado = listado.OrderBy(x => propertyInfo.GetValue(x, null)).ToList();
                }
            }

            var displayedDocumentos = listado;
            int pageSize = length != null ? Convert.ToInt32(length) : 0;
            int skip = start != null ? Convert.ToInt32(start) : 0;
            int recordsTotal = 0;
            recordsTotal = displayedDocumentos.Count();
            var data = displayedDocumentos.Skip(skip).Take(pageSize).ToList();

            return Json(new { draw = draw, recordsFiltered = recordsTotal, recordsTotal = recordsTotal, data = data }, JsonRequestBehavior.AllowGet);
        }

        public PartialViewResult AgregarValorTablaModal()
        {
            var maestrotablas = MantenimientoData.GetListarMaestroTabla();
            var listamaestrotablas = new SelectList(
                maestrotablas,
                "idmaestrotabla",
                "tabla");
            ViewData[LISTAMAESTROTABLA] = listamaestrotablas;

            return PartialView("_AgregarValorTablaModal");
        }

        [HttpPost]
        public ActionResult AgregarValorTablaModal(ValorTablaModel Modelo)
        {
            var datos = MantenimientoData.GetListarValoresxTabla(Modelo.idmaestrotabla);
            if (datos.Where(x => x.Text.Equals(Modelo.valor.Trim())).SingleOrDefault() != null)
            {
                return Json(new { res = false, msj = "El valor ya existe." }, JsonRequestBehavior.AllowGet);
            }

            var respuesta = string.Empty;
            Modelo.activo = true;
            try
            {
                var proveedor = MantenimientoData.InsertarActualizarValorTabla(Modelo, out respuesta);
                return Json(new { res = true }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", ex.InnerException.ToString());
                return Json(new { res = false, }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult EditarValorTablaModal(ValorTablaModel Modelo)
        {
            var respuesta = string.Empty;
            //Modelo.idproveedor = Usuario.Idusuario;

            var datos = MantenimientoData.GetListarValoresxTabla(Modelo.idmaestrotabla).ToList();
            if (datos.Where(x => x.Text.Equals(Modelo.valor.Trim()) && x.Value != Modelo.idvalortabla.ToString()).SingleOrDefault() != null)
            {
                return Json(new { res = false, msj = "El valor ya existe." }, JsonRequestBehavior.AllowGet);
            }
            try
            {
                var proveedor = MantenimientoData.InsertarActualizarValorTabla(Modelo, out respuesta);
                return Json(new { res = true }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", ex.InnerException.ToString());
                return Json(new { res = false }, JsonRequestBehavior.AllowGet);
            }
        }

        public PartialViewResult EditarValorTablaModal(int id)
        {
            var model = new ValorTablaModel();

            var maestrotablas = MantenimientoData.GetListarMaestroTabla();
            var listamaestrotablas = new SelectList(
                maestrotablas,
                "idmaestrotabla",
                "tabla");
            ViewData[LISTAMAESTROTABLA] = listamaestrotablas;

            var ovalortabla = new MantenimientoData().GetValorTabla(id);

            model.idmaestrotabla = ovalortabla.idmaestrotabla;
            model.valor = ovalortabla.valor;
            model.idvalortabla = ovalortabla.idvalortabla;
            model.activo = ovalortabla.activo;
            model.orden = ovalortabla.orden;

            return PartialView("_EditarValorTablaModal", model);
        }

        [HttpPost]
        public ActionResult EliminarValorTabla(int id)
        {
            var respuesta = string.Empty;
            //Modelo.idproveedor = Usuario.Idusuario;
            var Modelo = new ValorTablaModel();
            Modelo.activo = false;
            Modelo.idvalortabla = id;

            try
            {
                //var proveedor = PagoData.InsertarActualizarProveedor(Modelo, out respuesta);
                var valortabla = MantenimientoData.InsertarActualizarValorTabla(Modelo, out respuesta);
                return Json(new { res = true }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", ex.InnerException.ToString());
                return Json(new { res = false }, JsonRequestBehavior.AllowGet);
            }
        }

        #endregion ValorTabla

        #region Zona

        public ActionResult ListarZona()
        {
            return View();
        }

        public JsonResult JsonGetListarDistritoxZonaEditar(int? idprovincia, int? idzona, string sord, int page, int rows)
        {
            var result = MantenimientoData.GetListarDistritoZonaEditar(idzona, idprovincia);
            Session["idzona"] = idzona;

            var listadoTotal = result;
            int pageindex = page - 1;
            int pagesize = rows;

            int totalrecord = listadoTotal.Count();
            var totalpage = (int)Math.Ceiling((float)totalrecord / (float)rows);

            if (sord.ToUpper() == "DESC")
            {
                listadoTotal = listadoTotal.OrderByDescending(s => s.distrito).ToList();
                listadoTotal = listadoTotal.Skip(pageindex * pagesize).Take(pagesize).ToList();
            }
            else
            {
                listadoTotal = listadoTotal.OrderBy(s => s.distrito).ToList();
                listadoTotal = listadoTotal.Skip(pageindex * pagesize).Take(pagesize).ToList();
            }

            var jsonData = new
            {
                total = totalpage,
                page,
                records = totalrecord,
                rows = listadoTotal
            };

            return Json(jsonData, JsonRequestBehavior.AllowGet);
        }

        public JsonResult JsonGetListarDistritoxZona(int? idzona, string sord, int page, int rows)
        {
            var result = MantenimientoData.GetListarDistritoZona(idzona);
            Session["idzona"] = idzona;
            List<string> distritos = new List<string>();
            foreach (var item in result)
            {
                distritos.Add(item.iddistrito.ToString());
            }
            Session["distritos"] = distritos;

            var listadoTotal = result;
            int pageindex = page - 1;
            int pagesize = rows;

            int totalrecord = listadoTotal.Count();
            var totalpage = (int)Math.Ceiling((float)totalrecord / (float)rows);

            if (sord.ToUpper() == "DESC")
            {
                listadoTotal = listadoTotal.OrderByDescending(s => s.iddistrito).ToList();
                listadoTotal = listadoTotal.Skip(pageindex * pagesize).Take(pagesize).ToList();
            }
            else
            {
                listadoTotal = listadoTotal.OrderByDescending(s => s.iddistrito).ToList();
                listadoTotal = listadoTotal.Skip(pageindex * pagesize).Take(pagesize).ToList();
            }

            var jsonData = new
            {
                total = totalpage,
                page,
                records = totalrecord,
                rows = listadoTotal
            };

            return Json(jsonData, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult JsonGetListarZona(string criterio)
        {
            if (criterio == string.Empty) criterio = null;
            var draw = Request.Form.GetValues("draw").FirstOrDefault();
            var start = Request.Form.GetValues("start").FirstOrDefault();
            var length = Request.Form.GetValues("length").FirstOrDefault();
            var sortColumn = Request.Form.GetValues("columns[" + Request.Form.GetValues("order[0][column]").FirstOrDefault() + "][name]").FirstOrDefault();
            var sortColumnDir = Request.Form.GetValues("order[0][dir]").FirstOrDefault();
            var searchValue = Request.Form.GetValues("search[value]").FirstOrDefault();

            var listado = MantenimientoData.GetListarZona(criterio);

            if (sortColumn != "" && sortColumnDir != "")
            {
                if (sortColumnDir.ToUpper() == "DESC")
                {
                    var parametro = sortColumn;
                    var propertyInfo = typeof(ListarZonasDto).GetProperty(parametro);
                    listado = listado.OrderByDescending(x => propertyInfo.GetValue(x, null)).ToList();
                }
                else
                {
                    var parametro = sortColumn;
                    var propertyInfo = typeof(ListarZonasDto).GetProperty(parametro);
                    listado = listado.OrderBy(x => propertyInfo.GetValue(x, null)).ToList();
                }
            }

            var displayedDocumentos = listado;
            int pageSize = length != null ? Convert.ToInt32(length) : 0;
            int skip = start != null ? Convert.ToInt32(start) : 0;
            int recordsTotal = 0;
            recordsTotal = displayedDocumentos.Count();
            var data = displayedDocumentos.Skip(skip).Take(pageSize).ToList();

            return Json(new { draw = draw, recordsFiltered = recordsTotal, recordsTotal = recordsTotal, data = data }, JsonRequestBehavior.AllowGet);
        }

        public PartialViewResult AgregarZonaModal()
        {
            Session["distritos"] = null;
            var departamentos = GetListarDepartamento_Cache();
            var listadepartamentos = new SelectList(
                departamentos,
                "iddepartamento",
                "departamento");
            ViewData["ListadoDepartamento"] = listadepartamentos;
            return PartialView("_AgregarZonaModal");
        }

        public List<ListarDepartamentosDto> GetListarDepartamento_Cache()
        {
            var departamentos = HttpContext.Cache.Get("Departamentos") as List<ListarDepartamentosDto>;
            if (HttpContext.Cache["Departamentos"] == null)
            {
                departamentos = MantenimientoData.GetListarDepartamento();
                HttpContext.Cache.Insert("Departamentos", departamentos, null, DateTime.Now.AddSeconds(1500), Cache.NoSlidingExpiration);
            }
            else
                departamentos = (List<ListarDepartamentosDto>)HttpContext.Cache["Departamentos"];

            return departamentos;
        }

        [HttpPost]
        public ActionResult AgregarZonaModal(ZonaModel Modelo)
        {
            var respuesta = string.Empty;
            List<string> distritos = new List<string>();
            if (Modelo.distritos != null)
            {
                string[] distritosaux = Modelo.distritos.Split(',');
                distritos = distritosaux.ToList();
            }

            try
            {
                var distritosseleccionados = distritos; //(List<string>)Session["distritos"];
                var validar = MantenimientoData.validarZona(Modelo.nombre, Modelo.idzona);
                Modelo.activo = true;
                if (Modelo.idzona == null)
                {
                    if (validar.idzona != null)
                        return Json(new { res = false, mensaje = "Ya existe una zona con este nombre." }, JsonRequestBehavior.AllowGet);
                }

                var zona = MantenimientoData.InsertarActualizarZona(Modelo, distritosseleccionados);
                return Json(new { res = true }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", ex.InnerException.ToString());
                return Json(new { res = false }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult ListarProvincias(int? iddepartamento)
        {
            var provincias = MantenimientoData.GetListarProvincia(iddepartamento.Value).ToList();
            var listaprovincias = new SelectList(
                provincias,
                "idprovincia",
                "provincia");
            ViewData["ListadoProvincias"] = listaprovincias;
            return Json(listaprovincias, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult GridSaveDireccion(FormCollection formcollection)
        {
            var idcliente = Convert.ToInt32(Session["idcliente"]);

            int? iddireccion = int.Parse(formcollection["iddireccion"]);
            string codigo = formcollection["codigo"].ToString();
            string distrito = formcollection["distrito"].ToString();
            string direccion = formcollection["direccion"].ToString();

            if (iddireccion == 0) iddireccion = null;

            DireccionModel model = new DireccionModel();
            model.iddireccion = iddireccion;
            model.codigo = codigo;
            model.direccion = direccion;
            model.iddistrito = Convert.ToInt32(distrito);
            model.idcliente = idcliente;
            model.activo = true;
            model.principal = false;

            if (codigo != "" && idcliente != 0)
            {
                var validar = MantenimientoData.GetValidarDireccion(idcliente, codigo);
                if (validar.iddireccion > 0)
                    return Json(new { res = false }, JsonRequestBehavior.AllowGet);
            }

            var result = MantenimientoData.InsertarActualizarDireccion(model);

            return Json(new { res = true }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ListarDistritos(int? idprovincia)
        {
            var distritos = MantenimientoData.GetListarDistritos(idprovincia.Value).ToList();
            var listadistritos = new SelectList(
                distritos,
                "iddistrito",
                "distrito");
            ViewData["ListaDistrito"] = listadistritos;
            return Json(listadistritos, JsonRequestBehavior.AllowGet);
        }

        public JsonResult JsonGetListarDistritos(int? idprovincia, string sord, int page, int rows)
        {
            var result = MantenimientoData.GetListarDistritos(idprovincia);
            Session["iddistrito"] = idprovincia;

            var listadoTotal = result;
            int pageindex = page - 1;
            int pagesize = rows;

            int totalrecord = listadoTotal.Count();
            var totalpage = (int)Math.Ceiling((float)totalrecord / (float)rows);

            if (sord.ToUpper() == "DESC")
            {
                listadoTotal = listadoTotal.OrderByDescending(s => s.distrito).ToList();
                listadoTotal = listadoTotal.Skip(pageindex * pagesize).Take(pagesize).ToList();
            }
            else
            {
                listadoTotal = listadoTotal.OrderBy(s => s.distrito).ToList();
                listadoTotal = listadoTotal.Skip(pageindex * pagesize).Take(pagesize).ToList();
            }

            var jsonData = new
            {
                total = totalpage,
                page,
                records = totalrecord,
                rows = listadoTotal
            };

            return Json(jsonData, JsonRequestBehavior.AllowGet);
        }

        public ActionResult AgregarDistrito(int? iddistrito)
        {
            List<string> distritos;
            if ((List<string>)Session["distritos"] == null)
            {
                distritos = new List<string>();
                distritos.Add(iddistrito.ToString());
            }
            else
            {
                distritos = (List<string>)Session["distritos"];
                var res = distritos.Where(x => x.Equals(iddistrito.Value.ToString())).SingleOrDefault();
                if (res == null)
                    distritos.Add(iddistrito.ToString());
                else
                    distritos.Remove(iddistrito.Value.ToString());
            }
            Session["distritos"] = distritos;

            return Json(distritos, JsonRequestBehavior.AllowGet);
        }

        public PartialViewResult EditarZonaModal(int id)
        {
            var result = MantenimientoData.GetListarDistritoZona(id);
            List<string> distritos = new List<string>();
            foreach (var item in result)
            {
                distritos.Add(item.iddistrito.ToString());
            }
            Session["distritos"] = distritos;

            var departamentos = GetListarDepartamento_Cache();
            var listadepartamentos = new SelectList(
                departamentos,
                "iddepartamento",
                "departamento");
            ViewData["ListadoDepartamento"] = listadepartamentos;

            var model = new ZonaModel();
            var ozona = new MantenimientoData().GetZona(id);
            model.idzona = ozona.idzona;
            model.nombre = ozona.zona;

            return PartialView("_EditarZonaModal", model);
        }
        

        #endregion Zona

        #region cliente

        public ActionResult Cliente()
        {
            return View();
        }

        public JsonResult JsonGetDirecciones(int idcliente, string sord, int page, int rows)
        {
            var result = MantenimientoData.GetListarDireccionesxCliente(idcliente);

            //Session["idcliente"] = idcliente;

            var listadoTotal = result;
            int pageindex = page - 1;
            int pagesize = rows;

            int totalrecord = listadoTotal.Count();
            var totalpage = (int)Math.Ceiling((float)totalrecord / (float)rows);

            if (sord.ToUpper() == "DESC")
            {
                listadoTotal = listadoTotal.OrderByDescending(s => s.iddireccion).ToList();
                listadoTotal = listadoTotal.Skip(pageindex * pagesize).Take(pagesize).ToList();
            }
            else
            {
                listadoTotal = listadoTotal.OrderByDescending(s => s.iddireccion).ToList();
                listadoTotal = listadoTotal.Skip(pageindex * pagesize).Take(pagesize).ToList();
            }

            var jsonData = new
            {
                total = totalpage,
                page,
                records = totalrecord,
                rows = listadoTotal
            };

            return Json(jsonData, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult JsonGetListarCliente(string criterio)
        {
            if (criterio == string.Empty) criterio = null;
            var draw = Request.Form.GetValues("draw").FirstOrDefault();
            var start = Request.Form.GetValues("start").FirstOrDefault();
            var length = Request.Form.GetValues("length").FirstOrDefault();
            var sortColumn = Request.Form.GetValues("columns[" + Request.Form.GetValues("order[0][column]").FirstOrDefault() + "][name]").FirstOrDefault();
            var sortColumnDir = Request.Form.GetValues("order[0][dir]").FirstOrDefault();
            var searchValue = Request.Form.GetValues("search[value]").FirstOrDefault();

            var listado = DataAccess.Mantenimiento.MantenimientoData.GetListarClientes(criterio, true);
            if (sortColumn != "" && sortColumnDir != "")
            {
                if (sortColumnDir.ToUpper() == "DESC")
                {
                    var parametro = sortColumn;
                    var propertyInfo = typeof(ClienteModel).GetProperty(parametro);
                    listado = listado.OrderByDescending(x => propertyInfo.GetValue(x, null)).ToList();
                }
                else
                {
                    var parametro = sortColumn;
                    var propertyInfo = typeof(ClienteModel).GetProperty(parametro);
                    listado = listado.OrderBy(x => propertyInfo.GetValue(x, null)).ToList();
                }
            }

            var displayedDocumentos = listado;
            int pageSize = length != null ? Convert.ToInt32(length) : 0;
            int skip = start != null ? Convert.ToInt32(start) : 0;
            int recordsTotal = 0;
            recordsTotal = displayedDocumentos.Count();
            var data = displayedDocumentos.Skip(skip).Take(pageSize).ToList();

            return Json(new { draw = draw, recordsFiltered = recordsTotal, recordsTotal = recordsTotal, data = data }, JsonRequestBehavior.AllowGet);
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
            ViewData[LISTAMONEDA] = MantenimientoData.GetListarValoresxTabla(Convert.ToInt32(Constantes.MaestroTablas.Moneda));
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

            ViewData[LISTAMONEDA] = MantenimientoData.GetListarValoresxTabla(Convert.ToInt32(Constantes.MaestroTablas.Moneda));

            ViewData["ListaTipoDocumento"] = MantenimientoData.GetListarValoresxTabla(Convert.ToInt32(Constantes.MaestroTablas.TipoDocumento));
            ViewData["ListaSexo"] = MantenimientoData.GetListarValoresxTabla(Convert.ToInt32(Constantes.MaestroTablas.Sexo));

            return PartialView("_AgregarClienteModal");
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

        public PartialViewResult DireccionesModal(int idcliente)
        {
            DireccionModel model = new DireccionModel();

            Session["idcliente"] = idcliente;

            var result = ClienteData.GetObtenerCliente(idcliente);
            model.cliente = result.nombre;
            return PartialView("_AgregarDireccionModal", model);
        }

        [HttpPost]
        public ActionResult AgregarClienteModal(ClienteModel Modelo)
        {
            var respuesta = string.Empty;
            Modelo.__tipooperacion = 1;
            //Modelo.idproveedor = Usuario.Idusuario;
            //Modelo.activo = true;
            try
            {
                var cliente = ClienteData.InsertarActualizarCliente(Modelo, out respuesta);
                return Json(new { res = true }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", ex.InnerException.ToString());
                return Json(new { res = false }, JsonRequestBehavior.AllowGet);
            }
        }


        [HttpPost]
        public ActionResult EliminarCliente(int idcliente)
        {
            string respuesta;
            var modCliente = new ClienteModel();
            modCliente.idcliente = idcliente;
            modCliente.activo = false;
            modCliente.__tipooperacion = 2; //actualizar activo/inactivo
            ClienteData.InsertarActualizarCliente(modCliente,out respuesta);


            return Json(new { res = true });
        }

        public ActionResult EliminarDireccion(int iddireccion)
        {
            try
            {
                var idcliente = Convert.ToInt32(Session["idcliente"]);
                

                DireccionModel model = new DireccionModel();
                model.__tipooperacion = 2; // Cambiar Estado
                model.iddireccion = iddireccion;
                model.activo = false;

                var result = MantenimientoData.InsertarActualizarDireccion(model);
                return Json(new { res = true }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", ex.InnerException.ToString());
                return Json(new { res = false }, JsonRequestBehavior.AllowGet);
            }
        }


        #endregion cliente

        #region sucursal

        public ActionResult Sucursal()
        {
            var partners = new PartnerData().ListarPartner(null, null);
            var listapartners = new SelectList(
                 partners
                , "idpartner"
                , "razonsocial"
                );
            ViewData["listapartner"] = listapartners;

            return View();
        }

        public JsonResult JsonGetListarSucursal(string codigo
          , string nombre
          , int? idtipopartner
          , string sidx, string sord, int page, int rows)
        {
            var listadoTotal = new SucursalData().ListarSucursal(codigo, nombre, idtipopartner).ToList();
            var resjson1 = (new JqGridExtension<SucursalModel>()).DataBind(listadoTotal, listadoTotal.Count);
            return resjson1;

        }

        public PartialViewResult AgregarSucursalModal()
        {
            ViewData["listatiposucursal"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.TipoEntidad);
            ViewData["listatipopago"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.TipoPago);
            ViewData["listacondicionrecojo"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.CondicionRecojo);
            ViewData["listacondicionentrega"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.CondicionEntrega);

            var partners = new PartnerData().ListarPartner(null, null);
            var listadopartners = new SelectList(
                 partners
                , "idpartner"
                , "razonsocial"
                );
            ViewData["listapartner"] = listadopartners;

            var ubigeos = GetListarUbigeo_Cache();
            var listaUbigeos = new SelectList(
             ubigeos,
             "iddistrito",
             "ubigeo");
            ViewData["listaubigeos"] = listaUbigeos;

            return PartialView("_AgregarSucursalModal");
        }

        public PartialViewResult EditarSucursalModal(int idsucursal)
        {
            var model = new SucursalData().obtenerSucursal(idsucursal);

  
            //var valorestabla = MantenimientoData.GetListarValoresxTabla(null).Where(x => x.activo == true).ToList();

            ViewData["listatiposucursal"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.TipoEntidad);

            ViewData["listatipopago"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.TipoPago);

            var partners = new PartnerData().ListarPartner(null, null);
            var listadopartners = new SelectList(
                 partners
                , "idpartner"
                , "razonsocial"
                );
            ViewData["listapartner"] = listadopartners;

            var ubigeos = GetListarUbigeo_Cache();
            var listaUbigeos = new SelectList(
             ubigeos,
             "iddistrito",
             "ubigeo");
            ViewData["listaubigeos"] = listaUbigeos;

            ViewData["listacondicionrecojo"] = MantenimientoData.GetListarValoresxTabla(Convert.ToInt32(Constantes.MaestroTablas.CondicionRecojo));
            ViewData["listacondicionentrega"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.CondicionEntrega);

            return PartialView("_EditarSucursalModal", model);
        }

        [HttpPost]
        public JsonResult AgregarSucursalModal(SucursalModel model)
        {
            DireccionModel moddireccion = new DireccionModel();
            moddireccion.activo = true;
            moddireccion.codigo = "";
            moddireccion.direccion = model.direccion;
            moddireccion.iddistrito = model.iddistrito;
            moddireccion.principal = true;

            int iddireccion = MantenimientoData.InsertarActualizarDireccion(moddireccion);

            if (!model.reparacion)
                model.laboratoriocentral = true;
            else
                model.laboratoriocentral = false;
            if (model._tipopago != null)
                model.idtipopago = String.Join(",", model._tipopago);
            model.fechahoraregistro = DateTime.Now;
            model.idusuarioregistro = Usuario.Idusuario;
            model.iddireccion = iddireccion;
            model.activo = true;
            var idsurcursal = new SucursalData().InsertarActualizarSucursal(model);

            return Json(new { res = true }, JsonRequestBehavior.AllowGet);
        }

        public PartialViewResult GetControlDetailsGrid_Direccion(string control, string id)
        {
            if (control == "departamento")
            {
                var departamentos = GetListarDepartamento_Cache();
                var listadepartamentos = new SelectList(
                   departamentos,
                   "iddepartamento",
                   "departamento");
                ViewData["ListaDepartamento"] = listadepartamentos;
            }
            if (control == "provincia")
            {
                var provincias = MantenimientoData.GetListarProvincia(Convert.ToInt32(id));
                var listaprovincias = new SelectList(
                    provincias,
                    "idprovincia",
                    "provincia");
                ViewData["ListaProvincia"] = listaprovincias;
            }
            if (control == "distrito")
            {
                var distritos = MantenimientoData.GetListarDistritos(Convert.ToInt32(id));
                var listadistritos = new SelectList(
                   distritos,
                   "iddistrito",
                   "distrito");
                ViewData["ListaDistrito"] = listadistritos;
            }
            return PartialView("_controlgrid", control);
        }

        [HttpPost]
        public JsonResult EliminarSucursal(int idsucursal)
        {
            var modSucursal = new SucursalModel();
            modSucursal.idsucursal = idsucursal;
            modSucursal.activo = false;
            modSucursal.__tipooperacion = 2;  // actualizar activo inactivo
            new SucursalData().InsertarActualizarSucursal(modSucursal);

            return Json(new { res = true, msj = "Se ha eliminado correctamente" });
            
        }


        #endregion sucursal

        #region partner

        public ActionResult partner()
        {
            var partners = new PartnerData().ListarPartner(null, null);
            var listapartners = new SelectList(
                 partners
                , "idpartner"
                , "razonsocial"
                );
            ViewData["listapartner"] = listapartners;

            return View();
        }

        public ActionResult fabricante()
        {
            var partners = new PartnerData().ListarPartner(null, null);
            var listapartners = new SelectList(
                 partners
                , "idpartner"
                , "razonsocial"
                );
            ViewData["listapartner"] = listapartners;

            PartnerModel model = new PartnerModel();
            model.idtipopartner = 3;

            return View(model);
        }

        public JsonResult JsonGetListarFabricante(string numerodocumento
      , string razonsocial
      , string sidx, string sord, int page, int rows)
        {
            var listado = new PartnerData().ListarPartner(numerodocumento, razonsocial).Where(x => x.idtipopartner.Equals(3)).ToList();

            if (sidx != "" && sord != "")
            {
                sidx = sidx.Split(' ')[0];
                if (sord.ToUpper() == "DESC")
                {
                    var parametro = sidx;
                    var propertyInfo = typeof(PartnerModel).GetProperty(parametro);
                    listado = listado.OrderByDescending(x => propertyInfo.GetValue(x, null)).ToList();
                }
                else
                {
                    var parametro = sidx;
                    var propertyInfo = typeof(PartnerModel).GetProperty(parametro);
                    listado = listado.OrderBy(x => propertyInfo.GetValue(x, null)).ToList();
                }
            }

            var listadoTotal = listado;
            int pageindex = page - 1;
            int pagesize = rows;

            int totalrecord = listadoTotal.Count();
            var totalpage = (int)Math.Ceiling((float)totalrecord / (float)rows);

            var jsonData = new
            {
                total = totalpage,
                page,
                records = totalrecord,
                rows = listado
            };

            return Json(jsonData, JsonRequestBehavior.AllowGet);
        }

        public JsonResult JsonGetListarPartner(string numerodocumento
          , string razonsocial
          , string sidx, string sord, int page, int rows)
        {
            var listadoTotal = new PartnerData().ListarPartner(numerodocumento, razonsocial).Where(x => x.idtipopartner != 3).ToList();
            var resjson1 = (new JqGridExtension<PartnerModel>()).DataBind(listadoTotal, listadoTotal.Count);
            return resjson1;
        }

        public PartialViewResult AgregarFabricanteModal()
        {
            PartnerModel model = new PartnerModel();
            model.idtipopartner = (Int32)Constantes.TipoPartner.Fabricante;

            ViewData["listatipopartner"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.TipoPartner);
            ViewData["listatipopago"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.TipoPago);
            var partners = new PartnerData().ListarPartner(null, null);
            var listadopartners = new SelectList(
                 partners
                , "idpartner"
                , "razonsocial"
                );
            ViewData["listapartner"] = listadopartners;
            var ubigeos = GetListarUbigeo_Cache();
            var listaUbigeos = new SelectList(
             ubigeos,
             "iddistrito",
             "ubigeo");
            ViewData["listaubigeos"] = listaUbigeos;
            ViewData["listacondicionrecojo"] = MantenimientoData.GetListarValoresxTabla(Convert.ToInt32(Constantes.MaestroTablas.CondicionRecojo));
            ViewData[LISTAMONEDA] = MantenimientoData.GetListarValoresxTabla(Convert.ToInt32(Constantes.MaestroTablas.Moneda));
            ViewData["listacondicionentrega"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.CondicionEntrega);

            return PartialView("_AgregarFabricanteModal", model);
        }

        public PartialViewResult EditarFabricanteModal(int idpartner)
        {
            var modal = new PartnerData().ObtenerPartner(idpartner);

            var direccion = new MantenimientoData().GetDireccion(modal.iddireccion.Value);

            modal.iddistrito = direccion.iddistrito;
            modal.direccion = direccion.direccion;
            modal.iddireccion = direccion.iddireccion.Value;

            var partners = new PartnerData().ListarPartner(null, null);
            var listadopartners = new SelectList(
                 partners
                , "idpartner"
                , "razonsocial"
                );
            ViewData["listapartner"] = listadopartners;

            var ubigeos = GetListarUbigeo_Cache();
            var listaUbigeos = new SelectList(
             ubigeos,
             "iddistrito",
             "ubigeo");
            ViewData["listaubigeos"] = listaUbigeos;

            ViewData["listatipopartner"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.TipoPartner);
            ViewData["listatipopago"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.TipoPago);

            ViewData["listacondicionrecojo"] = MantenimientoData.GetListarValoresxTabla(Convert.ToInt32(Constantes.MaestroTablas.CondicionRecojo));
            ViewData[LISTAMONEDA] = MantenimientoData.GetListarValoresxTabla(Convert.ToInt32(Constantes.MaestroTablas.Moneda));
            ViewData["listacondicionentrega"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.CondicionEntrega);

            return PartialView("_EditarFabricanteModal", modal);
        }

        public PartialViewResult AgregarPartnerModal()
        {
            ViewData["listatipopartner"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.TipoPartner);
            ViewData["listatipopago"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.TipoPago);

            var partners = new PartnerData().ListarPartner(null, null);
            var listadopartners = new SelectList(
                 partners
                , "idpartner"
                , "razonsocial"
                );
            ViewData["listapartner"] = listadopartners;

            var ubigeos = GetListarUbigeo_Cache();
            var listaUbigeos = new SelectList(
             ubigeos,
             "iddistrito",
             "ubigeo");
            ViewData["listaubigeos"] = listaUbigeos;

            ViewData["listacondicionrecojo"] = MantenimientoData.GetListarValoresxTabla(Convert.ToInt32(Constantes.MaestroTablas.CondicionRecojo));

            ViewData[LISTAMONEDA] = MantenimientoData.GetListarValoresxTabla(Convert.ToInt32(Constantes.MaestroTablas.Moneda));

            ViewData["listacondicionentrega"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.CondicionEntrega);

            return PartialView("_AgregarPartnerModal");
        }

        public PartialViewResult EditarPartnerModal(int idpartner)
        {
            var modal = new PartnerData().ObtenerPartner(idpartner);

            if(modal.iddireccion.HasValue)
            {
                var direccion = new MantenimientoData().GetDireccion(modal.iddireccion.Value);
                if (direccion != null)
                {
                    modal.iddistrito = direccion.iddistrito;
                    modal.direccion = direccion.direccion;
                    modal.iddireccion = direccion.iddireccion.Value;
                }

            }
 

            var partners = new PartnerData().ListarPartner(null, null);
            var listadopartners = new SelectList(
                 partners
                , "idpartner"
                , "razonsocial"
                );
            ViewData["listapartner"] = listadopartners;

            var ubigeos = GetListarUbigeo_Cache();
            var listaUbigeos = new SelectList(
             ubigeos,
             "iddistrito",
             "ubigeo");
            ViewData["listaubigeos"] = listaUbigeos;

            ViewData["listacondicionrecojo"] = MantenimientoData.GetListarValoresxTabla(Convert.ToInt32(Constantes.MaestroTablas.CondicionRecojo));
            ViewData[LISTAMONEDA] = MantenimientoData.GetListarValoresxTabla(Convert.ToInt32(Constantes.MaestroTablas.Moneda));
            ViewData["listacondicionentrega"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.CondicionEntrega);
            ViewData["listatipopartner"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.TipoPartner);
            ViewData["listatipopago"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.TipoPago);

            return PartialView("_EditarPartnerModal", modal);
        }

        [HttpPost]
        public JsonResult AgregarPartnerModal(PartnerModel model)
        {
            DireccionModel moddireccion = new DireccionModel();
            moddireccion.activo = true;
            moddireccion.codigo = "";
            moddireccion.direccion = model.direccion;
            moddireccion.iddistrito = model.iddistrito;
            moddireccion.principal = true;
            if(model.iddireccion.HasValue)
            moddireccion.iddireccion = model.iddireccion;

            int iddireccion = MantenimientoData.InsertarActualizarDireccion(moddireccion);

            model.activo = true;
            model.idtipodocumento = (Int32)Constantes.TipoDocumento.RUC;
            model.iddireccion = iddireccion;
            var idpartner = new PartnerData().InsertarActualizarPartner(model);

            return Json(new { res = true }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult EliminarPartner(int idpartner)
        {
            var partner = new PartnerData().ObtenerPartner(idpartner);
            partner.activo = false;
            new PartnerData().InsertarActualizarPartner(partner);

            return Json(new { res = true }, JsonRequestBehavior.AllowGet);
        }

        #endregion partner

        #region tarifas

        public ActionResult Tarifa()
        {
            var partner = new PartnerData().ListarPartner("", "");

            var listapartner = new SelectList(
                partner,
                "idpartner"
                , "razonsocial"
                );
            ViewData["listapartner"] = listapartner;

            return View();
        }

        public JsonResult JsonGetListarTarifas(int? id, string sidx, string sord, int page, int rows)
        {
            if (id == null) return Json(new { } , JsonRequestBehavior.AllowGet);


            var listadoTotal = TarifasData.GetListarTarifas(id.Value).ToList();
            Session["idPartner"] = id;
            return (new JqGridExtension<TarifaModel>()).DataBind(listadoTotal, listadoTotal.Count);
        }
        [HttpPost]
        public JsonResult gridSaveTarifa(FormCollection formcollection)
        {

            var model = new TarifaModel();
            int? idTarifa = null;


            if (formcollection["idtarifa"] != "0")
                idTarifa = int.Parse(formcollection["idtarifa"]);
            else
            {
                model.idusuarioregistro = Usuario.Idusuario;
                model.fechahoraregistro = DateTime.Now;
            }

            int idPartner = Convert.ToInt32(Session["idPartner"]);
            int idTipoTarifa = Convert.ToInt32(formcollection["tipotarifa"]);
            int idTipoProducto = Convert.ToInt32(formcollection["tipoproducto"]);
            int idMoneda = Convert.ToInt32(formcollection["moneda"]);
            int idTipoOperacion = Convert.ToInt32(formcollection["tiporepacion"]);
            int idNivelReparacion = Convert.ToInt32(formcollection["nivelreparacion"]);
            bool garantia = Convert.ToBoolean(formcollection["garantia"]);
            decimal costo = Convert.ToDecimal(formcollection["costo"]);


            model.costo = costo;
            model.idmoneda = idMoneda;
            model.idnivelreparacion = idNivelReparacion;
            model.idpartner = idPartner;
            model.idtarifa = idTarifa;
            model.idtipoproducto = idTipoProducto;
            model.idtipotarifa = idTipoTarifa;
            model.garantia = garantia;
            model.activo = true;

            var resultado = new TarifasData().InsertarActualizarTarifa(model);

            return Json(new { res = true });
        }


        [HttpPost]
        public JsonResult EliminarTarifa(int idtarifa)
        {
            var modTarifa = new TarifaModel();
            modTarifa.idtarifa = idtarifa;
            modTarifa.activo = false;
            new TarifasData().InsertarActualizarTarifa(modTarifa);

            return Json(new {res = true });
        }

       #endregion tarifas

        #region Garantia 
        public ActionResult Garantias()
        {
            var partners = new PartnerData().ListarPartner(null, null);
            var listapartners = new SelectList(
                 partners
                , "idpartner"
                , "razonsocial"
                );
            ViewData["listapartner"] = listapartners;
            return View();
        }
        public JsonResult JsonGetListarGarantias(int? idPartner, string sidx, string sord, int page, int rows)
        {
            if (idPartner == null) return Json(new { }, JsonRequestBehavior.AllowGet);

            var listadoTotal = GarantiaData.listarGarantia(idPartner.Value).ToList();
            Session["idPartner"] = idPartner;
            return (new JqGridExtension<GarantiaModel>()).DataBind(listadoTotal, listadoTotal.Count);
        }

        [HttpPost]
        public JsonResult gridSaveRow(FormCollection formcollection)
        {
            int? idGarantia = null;
            var model = new GarantiaModel();

            if (formcollection["idgarantia"] != "0")
                idGarantia = int.Parse(formcollection["idgarantia"]);
            else
            {
                model.idusuarioregistro = Usuario.Idusuario;
                model.fechahoraregistro = DateTime.Now;
            }
            int idPartner = Convert.ToInt32(Session["idPartner"]);
            int idFabricante = int.Parse(formcollection["fabricante"]);
            int idTipoProducto = int.Parse(formcollection["tipoproducto"]);
            int idTipoGarantia = int.Parse(formcollection["tipogarantia"]);
            bool idDoccompra = bool.Parse(formcollection["documentocompra"]);
            int periodo = int.Parse(formcollection["periodo"]);


            model.activo = true;
            model.documentocompra = idDoccompra;
            model.idfabricante = idFabricante;
            model.idgarantia = idGarantia;
            model.idpartner = idPartner;
            model.idtipogarantia = idTipoGarantia;
            model.idtipoproducto = idTipoProducto;
            model.periodo = periodo;



            int resp =  new GarantiaData().insertarActualizarGarantia(model);

            return Json(new { res = true }, JsonRequestBehavior.AllowGet);

        }

        [HttpPost]
        public JsonResult eliminarGarantia(int idgarantia)
        {
            var modGarantia = new GarantiaModel();
            modGarantia.activo = false;
            modGarantia.idgarantia = idgarantia;
            modGarantia.__tipooperacion = 2;

            new GarantiaData().insertarActualizarGarantia(modGarantia);

            return Json(new { res = true });
        }

        #endregion

        #region Falla
        public ActionResult Falla()
        {


            var categoriafalla = FallaData.GetListarCategoriaFalla();
            var listacategoriafalla = new SelectList(categoriafalla, "idcategoriafalla", "descripcion");
            ViewData["listacategoriafalla"] = listacategoriafalla;


            var partners = new PartnerData().ListarPartner(null, null)
                    .Where(x => x.idtipopartner.Equals(Convert.ToInt32(Constantes.TipoPartner.Fabricante))).ToList();
            var listapartners = new SelectList(
                 partners
                , "idpartner"
                , "razonsocial"
                );
            ViewData["listapartner"] = listapartners;

            return View();
        }
        public JsonResult JsonGetListarFalla(int? idcat, int? idfar, string sidx, string sord, int page, int rows)
        {

            var listadoTotal = new FallaData().listarFalla(idcat, idfar).ToList();
            return (new JqGridExtension<FallaModel>()).DataBind(listadoTotal, listadoTotal.Count);
        }

        public JsonResult gridSaveFalla(FormCollection formCollection)
        {
            var model = new FallaModel();
            int? idFalla = null;

            if (formCollection["idfalla"] != "0")
                idFalla = int.Parse(formCollection["idfalla"]);
            else
            {
                model.idusuarioregistro = Usuario.Idusuario;
                model.fechahoraregistro = DateTime.Now;
            }

            int idTipoFalla = int.Parse(formCollection["tipofalla"]);
            int idCategoriaFalla = int.Parse(formCollection["categoriafalla"]);
            int idTipoProducto = int.Parse(formCollection["tipoproducto"]);
            int idFabricante = int.Parse(formCollection["fabricante"]);
            string codigosmartway = formCollection["codigosmartway"].ToString();
            string descripcion = formCollection["descripcion"].ToString();

            model.activo = true;
            model.codigosmartway = codigosmartway;
            model.descripcion = descripcion;
            model.idcategoriafalla = idCategoriaFalla;
            model.idfabricante = idFabricante;
            model.idfalla = idFalla;
            model.idtipofalla = idTipoFalla;
            model.idtipoproducto = idTipoProducto;

            try
            {
                var respuesta = new FallaData().InsertarActualizarFalla(model);
                return Json(new { res = true });
            }
            catch (Exception ex)
            {
                Error(ex.ToString());
                return Json(new { res = false });
            }
          


           
        }
        #endregion


        #region Diagnostico
        public ActionResult Diagnostico()
        {
            var categoriareparacion = ReparacionData.GetListarCategoriaReparacion();
            var listacategoriafalla = new SelectList(categoriareparacion, "idcategoriareparacion", "descripcion");
            ViewData["listacategoriareparacion"] = listacategoriafalla;


            var partners = new PartnerData().ListarPartner(null, null)
                    .Where(x => x.idtipopartner.Equals(Convert.ToInt32(Constantes.TipoPartner.Fabricante))).ToList();
            var listapartners = new SelectList(
                 partners
                , "idpartner"
                , "razonsocial"
                );
            ViewData["listapartner"] = listapartners;

            return View();
        }
        public JsonResult JsonGetListarDiagnostico(int? idcat, int? idfar, string sidx, string sord, int page, int rows)
        {

            var listadoTotal = new DiagnosticoData().listarDiagnostico(idcat, idfar, null, null).ToList();
            return (new JqGridExtension<DiagnosticoModel>()).DataBind(listadoTotal, listadoTotal.Count);
        }

        public JsonResult gridSaveDiagnostico(FormCollection formCollection)
        {
            var model = new DiagnosticoModel();
            int? idDiagnostico = null;
            
            if (formCollection["iddiagnostico"] != "0")
                idDiagnostico = int.Parse(formCollection["iddiagnostico"]);

            int idCategoriaReparacion = int.Parse(formCollection["categoriareparacion"]);
            string codigosmartway = formCollection["codigosmartway"].ToString().Trim().ToUpper();
            string descripcion = formCollection["descripcion"].ToString().Trim().ToUpper();

            model.descripcion = descripcion;
            model.idcategoriareparacion = idCategoriaReparacion;
            model.iddiagnostico = idDiagnostico;
            model.codigosmartway = codigosmartway;


            try
            {
                var respuesta = new DiagnosticoData().InsertarActualizarDiagnostico(model);
                return Json(new { res = true });
            }
            catch (Exception ex)
            {
                Error(ex.ToString());
                return Json(new { res = false });
            }




        }

        public PartialViewResult VincularTipoProductoModal(int iddiagnostico)
        {
            var model = new DiagnosticoData().listarDiagnostico(null, null, null, null, iddiagnostico).FirstOrDefault();
            model.ListaTipoProductos = GetListaTipoProducto();
            model.iddiagnostico = iddiagnostico;
            if(model.tiposproducto != null)
            model.TipoProductosSeleccionados = model.tiposproducto.Split(',');


           
            return PartialView("_VincularTipoProductoModal", model);
        }
        private IEnumerable<SelectListItem> GetListaTipoProducto()
        {
            List<SelectListItem> ListaAccesorios = new List<SelectListItem>();
            var Lista = new ProductoData().listarTipoProducto();

            foreach (TipoProductoModel Accesorio in Lista)
            {
                ListaAccesorios.Add(new SelectListItem { Value = Accesorio.idtipoproducto.ToString(), Text = Accesorio.nombre });
            }
            return ListaAccesorios.AsEnumerable();
        }

        [HttpPost]
        public JsonResult VincularProductoModal(DiagnosticoModel model)
        {
            DiagnosticoxTipoProductoModel obj= null;
            var res1 = new DiagnosticoData().EliminarTipoProductoxDiagnostico(model.iddiagnostico.Value);

            if (model.TipoProductosSeleccionados != null)
            {

                foreach (var item in model.TipoProductosSeleccionados)
                {
                    obj = new DiagnosticoxTipoProductoModel();
                    obj.idtipoproducto = Convert.ToInt32(item);
                    obj.iddiagnosticosmartway = model.iddiagnostico.Value;
                    new DiagnosticoData().InsertarActualizarDiagnosticoxTipoProducto(obj);

                }
            }
            
            return Json(new { res = true });
        }

        #endregion
        #region Reparacion 
        public ActionResult Reparacion()
        {
            var categoriareparacion = ReparacionData.GetListarCategoriaReparacion();
            var listacategoriafalla = new SelectList(categoriareparacion, "idcategoriareparacion", "descripcion");
            ViewData["listacategoriareparacion"] = listacategoriafalla;


            var partners = new PartnerData().ListarPartner(null, null)
                    .Where(x => x.idtipopartner.Equals(Convert.ToInt32(Constantes.TipoPartner.Fabricante))).ToList();
            var listapartners = new SelectList(
                 partners
                , "idpartner"
                , "razonsocial"
                );
            ViewData["listapartner"] = listapartners;

            return View();
        }
        public JsonResult JsonGetListarReparacion(int? idcat, int? idfar, string sidx, string sord, int page, int rows)
        {

            var listadoTotal = new ReparacionData().listarReparacion(idcat, idfar,null).ToList();
            return (new JqGridExtension<ReparacionModel>()).DataBind(listadoTotal, listadoTotal.Count);
        }

        public JsonResult gridSaveReparacion(FormCollection formCollection)
        {
            var model = new ReparacionModel();
            int? idReparacion = null;

            if (formCollection["idreparacion"] != "0")
                idReparacion = int.Parse(formCollection["idreparacion"]);
            else
            {
                model.idusuarioregistro = Usuario.Idusuario;
                model.fechahoraregistro = DateTime.Now;
            }

            int idCategoriaReparacion = int.Parse(formCollection["categoriareparacion"]);
            string codigosmartway = formCollection["codigosmartway"].ToString().Trim().ToUpper();
            string descripcion = formCollection["descripcion"].ToString().Trim().ToUpper();
            int IdNivelReparacion = int.Parse(formCollection["nivelreparacion"]);

            model.codigosmartway = codigosmartway;
            model.descripcion = descripcion;
            model.idcategoriareparacion = idCategoriaReparacion;
            model.idreparacion = idReparacion;
            model.idnivelreparacion = IdNivelReparacion;
            model.activo = true;


            try
            {
                var respuesta = new ReparacionData().InsertarActualizarReparacion(model);
                return Json(new { res = true });
            }
            catch (Exception ex)
            {
                Error(ex.ToString());
                return Json(new { res = false });
            }




        }

        #endregion 


        public PartialViewResult GetControlDetailsGrid(string control, string id)
        {
            if (control == "departamento")
            {
                var departamentos = GetListarDepartamento_Cache();
                var listadepartamentos = new SelectList(
                   departamentos,
                   "iddepartamento",
                   "departamento");
                ViewData["ListaDepartamento"] = listadepartamentos;
            }
            if (control == "provincia")
            {
                var provincias = MantenimientoData.GetListarProvincia(Convert.ToInt32(id));
                var listaprovincias = new SelectList(
                    provincias,
                    "idprovincia",
                    "provincia");
                ViewData["ListaProvincia"] = listaprovincias;
            }

            if (control == "distrito")
            {
                var distritos = MantenimientoData.GetListarDistritos(Convert.ToInt32(id));
                var listadistritos = new SelectList(
                   distritos,
                   "iddistrito",
                   "distrito");
                ViewData["ListaDistrito"] = listadistritos;
            }
            else if (control == "fabricante")
            {
                var partners = new PartnerData().ListarPartner(null, null)
                    .Where(x => x.idtipopartner.Equals(Convert.ToInt32(Constantes.TipoPartner.Fabricante))).ToList();

                var listapartners = new SelectList(
                     partners
                    , "idpartner"
                    , "razonsocial"
                    );
                ViewData["listapartner"] = listapartners;

            }
            else if (control == "tipotarifa")
            {
                ViewData["listatipotarifa"] = MantenimientoData.GetListarValoresxTabla(Convert.ToInt32(Constantes.MaestroTablas.TipoTarifa)); ;
            }
            else if (control == "tipoproducto")
            {
                var tipoproducto = new ProductoData().listarTipoProducto();
                var listatipoproducto = new SelectList(
                     tipoproducto
                    , "idtipoproducto"
                    , "nombre"
                    );
                ViewData["listatipoproducto"] = listatipoproducto;
            }
            else if (control == "garantia")
            {
                var tipoproducto = new ProductoData().listarTipoProducto();
                var listatipoproducto = new SelectList(
                     tipoproducto
                    , "idtipoproducto"
                    , "nombre"
                    );
                ViewData["listatipoproducto"] = listatipoproducto;
            }
            else if (control == "tipogarantia")
            {
                var tipogarantia = GarantiaData.listarTipoGarantia();
                var listatipogarantia = new SelectList(
                     tipogarantia
                    , "idtipogarantia"
                    , "nombre"
                    );
                ViewData["listatipogarantia"] = listatipogarantia;
            }
            else if (control == "moneda")
            {
                ViewData["listamoneda"] = MantenimientoData.GetListarValoresxTabla(Convert.ToInt32(Constantes.MaestroTablas.Moneda)); ;
            }
            else if (control == "nivelreparacion")
            {
                ViewData["listanivelreparacion"] = MantenimientoData.GetListarValoresxTabla(Convert.ToInt32(Constantes.MaestroTablas.NivelReparacion)); ;
            }
            else if (control == "doccompra")
            {
                var lista = new List<ListItem>();
                lista.Add(new ListItem() { Value = "true", Text = "Si" });
                lista.Add(new ListItem() { Value = "false", Text = "No" });
                var doccompro = new SelectList(
                     lista
                    , "Value"
                    , "Text"
                    );
                ViewData["listadoccompro"] = doccompro;
            }
            else if (control == "condiciongarantia")
            {
                var lista = new List<ListItem>();
                lista.Add(new ListItem() { Value = "true", Text = "Si" });
                lista.Add(new ListItem() { Value = "false", Text = "No" });
                var garantia = new SelectList(
                     lista
                    , "Value"
                    , "Text"
                    );
                ViewData["listagarantia"] = garantia;
            }
            else if (control == "tipofalla")
            {
                var tipofalla = FallaData.GetListarTiposFalla();
                var listatipofalla = new SelectList(
                     tipofalla
                    , "idtipofalla"
                    , "descripcion"
                    );
                ViewData["listatipofalla"] = listatipofalla;
            }
            else if (control == "categoriafalla")
            {
                var categoriafalla = FallaData.GetListarCategoriaFalla();
                var listacategoriafalla = new SelectList(
                     categoriafalla
                    , "idcategoriafalla"
                    , "descripcion"
                    );
                ViewData["listacategoriafalla"] = listacategoriafalla;
            }
            else if (control == "categoriareparacion")
            {
                var categoriareparacion = ReparacionData.GetListarCategoriaReparacion();
                var listacategoriareparacion = new SelectList(
                     categoriareparacion
                    , "idcategoriareparacion"
                    , "descripcion"
                    );
                ViewData["listacategoriareparacion"] = listacategoriareparacion;
            }
            else if (control == "tipodiagnostico")
            {
                var tipodiagnostico = DiagnosticoData.GetListarTiposDiagnostico();
                var listatipodiagnostico = new SelectList(
                     tipodiagnostico
                    , "idtipodiagnostico"
                    , "descripcion"
                    );
                ViewData["listatipodiagnostico"] = listatipodiagnostico;
            }
            else if (control == "tiporeparacion")
            {
                var tiporeparacion =  ReparacionData.listarTipoReparacion();
                var listatiporeparacion = new SelectList(
                     tiporeparacion
                    , "idtiporeparacion"
                    , "descripcion"
                    );
                ViewData["listatiporeparacion"] = listatiporeparacion;
            }
            return PartialView("_controlgrid", control);
        }
        #region Almacen
        public ActionResult Almacen()
        {
            var sucursales = new SucursalData().ListarSucursal("", "", null, (Int32)Constantes.Partner.Smartway);
            var listasucursal = new SelectList(sucursales, "idsucursal", "nombre");
            ViewData["listasucursal"] = listasucursal;
            return View();
        }
        [HttpPost]
        public JsonResult JsonGetListarAlmacen(int? idsucursal, string codigoAlmacen)
        {
            if (codigoAlmacen == string.Empty) codigoAlmacen = null;
            var listadoTotal = InventarioData.GetListarAlmacen(idsucursal, codigoAlmacen).ToList();
            return (new JqGridExtension<AlmacenModel>()).DataBind(listadoTotal, listadoTotal.Count);
        }
        public PartialViewResult NuevoAlmacenModal()
        {
            ViewData["listatipoalmacen"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.TipoAlmacen);

            var sucursales = new SucursalData().ListarSucursal("", "", null, (Int32)Constantes.Partner.Smartway);
            var listasucursal = new SelectList(sucursales, "idsucursal", "nombre");
            ViewData["listasucursal"] = listasucursal;

            return PartialView("_NuevoAlmacen");
        }
        public PartialViewResult EditarAlmacenModal(int id)
        {
            var model = new InventarioData().obtenerAlmacen(id);
            ViewData["listatipoalmacen"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.TipoAlmacen);

            var sucursales = new SucursalData().ListarSucursal("", "", null, (Int32)Constantes.Partner.Smartway);

            var listasucursal = new SelectList(sucursales, "idsucursal", "nombre");
            ViewData["listasucursal"] = listasucursal;
            return PartialView("_EditarAlmacen", model);
        }
        [HttpPost]
        public JsonResult AgregarAlmacenModal(AlmacenModel model)
        {
            model.activo = true;
            model.__tipooperacion = 1;//Actualizacion/Insercion
            new InventarioData().InsertarActualizarAlmacen(model);

            return Json(new { res = true });
        }
        [HttpPost]
        public JsonResult EliminarAlmacen(int id)
        {
            var model = new InventarioData().obtenerAlmacen(id);
            model.activo = false;
            model.__tipooperacion = 1;//Elminacion/Activacion
            new InventarioData().InsertarActualizarAlmacen(model);

            return Json(new { res = true });
        }
        #endregion
    }
}