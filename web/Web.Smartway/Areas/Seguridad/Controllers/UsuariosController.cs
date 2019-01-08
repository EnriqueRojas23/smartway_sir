using System;
using AutoMapper;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.Common.Controllers;
using Web.Common.Extensions;
using Web.Common.HtmlHelpers;
using Web.Smartway.Areas.Seguridad.Models.Usuarios;
using Web.Smartway.DataAccess;
using Componentes.Common.Utilidades;
using Web.Smartway.DataAccess.Seguridad;
using QueryContracts.Smartway.Seguridad.Result;
using System.Configuration;
using QueryContracts.Smartway.Account.Results;
using Web.Smartway.Areas.Seguridad.Models.Usuarios;
using Web.Smartway.DataAccess.Mantenimiento;



namespace Web.Smartway.Areas.Seguridad.Controllers
{
    public class UsuariosController : BaseController
    {
        #region Listado de Usuarios

        public ActionResult Index()
        {
            return RedirectToAction("ListarUsuarios", "Usuarios", new { area = "seguridad" });
        }

        public ActionResult ListarUsuarios()
        {
            var modelo = new ListarUsuariosModel(true);

            TipoUsuario oTipoUsuario = new TipoUsuario();
            List<TipoUsuario> tipos = new List<TipoUsuario>();
            oTipoUsuario.idtipo = 1;
            oTipoUsuario.tipo = "Interno";
            tipos.Add(oTipoUsuario);
            oTipoUsuario = new TipoUsuario();
            oTipoUsuario.idtipo = 2;
            oTipoUsuario.tipo = "Externo";
            tipos.Add(oTipoUsuario);
           

            var listatipos = new SelectList(
                      tipos,
                      "idtipo",
                      "tipo");
            ViewData["ListadoTipos"] = listatipos;


            var clientes = MantenimientoData.GetListarClientes(null, true).ToList();
            var listaclientes = new SelectList(
                   clientes,
                   "idcliente",
                   "nombrecorto");
            ViewData["ListadoClientes"] = listaclientes;




            return View(modelo);
        }

        [HttpPost]
        public ActionResult ListarUsuariosModel(ListarUsuariosModel modelo)
        {
            //if (!string.IsNullOrEmpty(modelo.SearchDefault))
            //{
            //    modelo.AliasUsuario = string.Empty;
            //    modelo.NombreCompleto = string.Empty;

            //    //analizando el filtro principal.
            //    if (!modelo.SearchDefault.IsFormatSearch())
            //    {
            //        modelo.NombreCompleto = modelo.SearchDefault;
            //        modelo.SearchDefault = "{" + Constantes.Seguridad.Usuario.listadopedido_filtro_nombrecompleto + ":" + modelo.NombreCompleto + "}";
            //    }
            //    else
            //    {
            //        var res = modelo.SearchDefault.FormatSearch();
            //        modelo.NombreCompleto = res.GetOrDefault(Constantes.Seguridad.Usuario.listadopedido_filtro_nombrecompleto);
            //        modelo.AliasUsuario = res.GetOrDefault(Constantes.Seguridad.Usuario.listadopedido_filtro_aliasusuario);
            //        modelo.IdRol = Utilidades.Cast<int?>(res.GetOrDefault(Constantes.Seguridad.Usuario.listadopedido_filtro_rol));
            //    }
            //}
            //modelo.FillSelectList();
            return View(modelo);
        }
        
      //  [HttpPost]
        //[AcceptVerbs(HttpVerbs.Post)]
        //public JsonResult JsonListarUsuarios( ListarUsuariosModel modelo, FormCollection formcollection)
        public JsonResult JsonListarUsuarios(string nom , int? rol)
        {
            var modelo = new ListarUsuariosModel() { NombreCompleto = nom, IdRol = rol };
            var listadoTotal = UsuariosData.GetListarUsuarios(modelo);
            var resjson1 = (new JqGridExtension<ListarUsuariosDto>()).DataBind(listadoTotal, listadoTotal.Count);
            return resjson1;
           
        }

        #endregion

        #region Asignar Roles a los Usuarios
        public ActionResult AsignarRolesUsuarios(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                this.Error(new ArgumentNullException("No se ha ingresado el id del usuario"));
                return RedirectToAction("ListarUsuarios", "Usuarios");
            }
            if (!Utilidades.IsNumeric(id))
            {
                this.Error(new InvalidCastException("El id ingresado no cumple el formato numerico requerido"));
                return RedirectToAction("ListarUsuarios", "Usuarios");
            }

            var modelo = GetAsignarRolesUsuariosModel(Convert.ToInt32(id));

            return View(modelo);
        }

        
        [HttpPost]
        public ActionResult AsignarRolesUsuarios(AsignarRolesUsuariosModel modelo, FormCollection formcollection)
        {
            var sis_str_siglas = ConfigurationManager.AppSettings["ModuleAcronym"] == null ? string.Empty : Convert.ToString(ConfigurationManager.AppSettings["ModuleAcronym"]);
            var rol_int_id_array = new List<Int32>();
            if (!string.IsNullOrEmpty(modelo.idsRolesDestino)){
                rol_int_id_array = modelo.idsRolesDestino.Split(',').Select(Int32.Parse).ToList();
            }
            var roles_procesados = UsuariosData.AsignarRolesUsuarios(this.ControllerContext, sis_str_siglas, modelo.usr_int_id, rol_int_id_array.ToArray());
            if (roles_procesados == 0) { ViewBag.Mensaje = "Se han activo todos los roles al usuario"; }
            else { ViewBag.Mensaje = string.Format("se han asignado {0} al usuario seleccionado", roles_procesados); }

            if (roles_procesados > 0)
                return Json(new { res = "true" }, JsonRequestBehavior.AllowGet);

            return Json(new { res = "false" }, JsonRequestBehavior.AllowGet);
        }

        private AsignarRolesUsuariosModel GetAsignarRolesUsuariosModel(int id)
        {
            var res = UsuariosData.GetdatosBasicosUsuario(id, null);
            if (res == null) return null;

            Mapper.CreateMap<ObtenerDatosBasicosUsuarioResult, AsignarRolesUsuariosModel>();
            var modelo = Mapper.Map<ObtenerDatosBasicosUsuarioResult, AsignarRolesUsuariosModel>(res);

            return modelo;
        }
        public ActionResult AsignarRolesModal(int id)
        {
            var model = GetAsignarRolesUsuariosModel(id);
            return PartialView("_AsignarRolesModal", model);
        }
        public JsonResult ListarRolesDisponiblesAsignados(string ptipo,  string pured, string pralias, string sidx, string sord, int page, int rows)
        {
            int tiporeporte = (String.IsNullOrEmpty(ptipo) || !Utilidades.IsNumeric(ptipo)) ? 0 : Convert.ToInt32(ptipo);
            var listadoTotal = RolesData.GetListarRolesAsignables(pured, pralias, tiporeporte);
            var resjson1 = (new JqGridExtension<ListarRolesAsignablesDto>()).DataBind(listadoTotal, listadoTotal.Count);
            return resjson1;
        }

        #endregion 

        public ActionResult Insertar()
        {
            return View(GetInsertarModificarUsuarioModel(null));
        }
        public ActionResult EliminarUsuario(int id)
        {
            var res = DataAccess.Seguridad.UsuariosData.EliminarUsuario(id);
            if(res=="OK")
                return Json(new { success = true, msj = res }, JsonRequestBehavior.AllowGet);
            else
                return Json(new { success = false, msj = res }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult Modificar(InsertarModificarUsuarioModel modelo)
        {
            if (ModelState.IsValid)
            {
                if (modelo._tiposproducto != null)
                    modelo.tiposproducto = String.Join(",", modelo._tiposproducto);

                var res = UsuariosData.InsertarUsuario(this.ControllerContext, modelo);
                 return Json(new { res = true }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { res = true } , JsonRequestBehavior.AllowGet );
        }
        [HttpPost]
        public ActionResult DesbloquearUsuario(int id)
        {


            if (ModelState.IsValid)
            {
                var rSes = UsuariosData.DesbloquearUsuario(id);
                return Json(new { success = true }, JsonRequestBehavior.AllowGet);
            }
            return View();
        }
        [HttpPost]
        public JsonResult Insertar(InsertarModificarUsuarioModel modelo)
        {
            if (ModelState.IsValid)
            {
                if (modelo._tiposproducto!= null)
                    modelo.tiposproducto = String.Join(",", modelo._tiposproducto);

                var res = UsuariosData.InsertarUsuario(this.ControllerContext, modelo);
                return Json(new { res = true }, JsonRequestBehavior.AllowGet);
            }
            else
            { 
                return Json(new { success = false, errors = GetModelStateErrors(ModelState) }, JsonRequestBehavior.AllowGet); 
            }
        }

        private InsertarModificarUsuarioModel GetInsertarModificarUsuarioModel(int? id)
        {
            string res = string.Empty;
            InsertarModificarUsuarioModel modelo = null;

            if (modelo._tiposproducto != null)
                modelo.tiposproducto = String.Join(",", modelo._tiposproducto);

            if (id.HasValue)
            {
                var resusuario = AccountData.ObtenerUsuario(id.Value, ref res);
                Mapper.CreateMap<ObtenerUsuarioResult, InsertarModificarUsuarioModel>();
                modelo = Mapper.Map<ObtenerUsuarioResult, InsertarModificarUsuarioModel>(resusuario);
            }
            else
            {
                modelo = new InsertarModificarUsuarioModel();
               // modelo.Sis_int_id = 1;
            }
            return modelo;
        }

        public JsonResult ResetearPassword(string id)
        {
            if (string.IsNullOrEmpty(id))
            {

                this.Error(new ArgumentNullException("No se ha ingresado el id del usuario"));
                return Json(new { res = "false", msj="No se ha ingresado el id del usuario" });

            }
            if (!Utilidades.IsNumeric(id))
            {
                this.Error(new InvalidCastException("El id ingresado no cumple el formato numerico requerido"));
                return Json(new { res = "false", msj = "El id ingresado no cumple el formato numerico requerido" });
            }

            var result = UsuariosData.ResetarContraseña(this.ControllerContext, int.Parse(id));
            if (string.IsNullOrEmpty(result)) return Json(new { res = "false", msj = "No se ha podido resetear la contraseña" });




            return Json(new { res = "true", msj = string.Format("La contraseña se ha generado correctamente: {0}", result) });
        }
        public PartialViewResult InsertarModal(int? id)
        {
            var modelo = new  InsertarModificarUsuarioModel();


            var tipoproducto = new ProductoData().listarTipoProducto();
            var listatipoproducto = new SelectList(
                 tipoproducto
                , "idtipoproducto"
                , "nombre"
                );
            ViewData["listatipoproducto"] = listatipoproducto;


            ViewData["listatipousuario"] = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.TipoUsuario);

            var sucursal = new SucursalData().ListarSucursal("", "", null);
            var listasucursal = new SelectList(
                sucursal
                , "idsucursal"
                , "nombre");
            ViewData["listasucursal"] = listasucursal;

            var partners = new PartnerData().ListarPartner(null,null);
            var listapartners = new SelectList(
                 partners
                , "idpartner"
                , "razonsocial"
                );
            ViewData["listapartner"] = listapartners;

            //mapeando valores en el modelo
            if (id != null)
            {
                var result = UsuariosData.ObtenerUsuario(id);
                modelo.Usr_str_nombre = result.usr_str_nombre;
                modelo.Usr_str_apellidos = result.usr_str_apellidos;
                modelo.Usr_str_email = result.usr_str_email;
                modelo.Usr_str_red = result.usr_str_red;
                modelo.Usr_int_id = result.usr_int_id;
                modelo.usr_str_tipoacceso = result.usr_str_tipoacceso;

            }

            return PartialView("_InsertarModificarUsuario", modelo);
        }
       
        public ActionResult AsignarClientesUsuarios(AsignarClientesModal modelo)
        {
            var AsignarClientes = DataAccess.Seguridad.UsuariosData.AsignarClientesUsuarios(this.ControllerContext, modelo.usuario, modelo.ClientesSeleccionados);
            return RedirectToAction("ListarUsuarios", "usuarios");
        }
        private IEnumerable<SelectListItem> GetListaClientes()
        {
            List<SelectListItem> ListaAccesorios = new List<SelectListItem>();
            return ListaAccesorios.AsEnumerable();
        }
     
        public PartialViewResult ModificarModal(int? id)
        {
            var modelo = new InsertarModificarUsuarioModel();
            //mapeando valores en el modelo
            ViewData["listatipousuario"]  = MantenimientoData.GetListarValoresxTabla((Int32)Constantes.MaestroTablas.TipoUsuario);

            var sucursal = new SucursalData().ListarSucursal("", "", null);
            var listasucursal = new SelectList(
                sucursal
                , "idsucursal"
                , "nombre");
            ViewData["listasucursal"] = listasucursal;

            var partners = new PartnerData().ListarPartner(null,null);
            var listapartners = new SelectList(
                 partners
                , "idpartner"
                , "razonsocial"
                );
            ViewData["listapartner"] = listapartners;
            var tipoproducto = new ProductoData().listarTipoProducto();
            var listatipoproducto = new SelectList(
                 tipoproducto
                , "idtipoproducto"
                , "nombre"
                );
            ViewData["listatipoproducto"] = listatipoproducto;
            if (id != null)
            {
                var result = DataAccess.Seguridad.UsuariosData.ObtenerUsuario(id);
                modelo.Usr_str_nombre = result.usr_str_nombre;
                modelo.Usr_str_apellidos = result.usr_str_apellidos;
                modelo.Usr_str_email = result.usr_str_email;
                modelo.Usr_str_red = result.usr_str_red;
                modelo.Usr_int_id = result.usr_int_id;
                modelo.Usr_bool_bloqueado = Convert.ToBoolean(result.usr_int_bloqueado);
                modelo.Usr_bool_aprobado = Convert.ToBoolean(result.usr_bit_aprobado);
                modelo.usr_str_tipoacceso = result.usr_str_tipoacceso;
                modelo.idcliente = result.idcliente;
                modelo.callcenter = result.callcenter;
                modelo.idpartner = result.idpartner;
                modelo.idsucursal = result.idsucursal;
                modelo.idtipousuario = result.idtipousuario;
                modelo.tiposproducto = result.tiposproducto;
                //modelo._tiposproducto = result.tiposproducto.ToArray();

            }

            return PartialView("_ModificarUsuario", modelo);
        }
        public List<string> GetModelStateErrors(ModelStateDictionary ModelState)
        {
            List<string> errorMessages = new List<string>();

            var validationErrors = ModelState.Values.Select(x => x.Errors);
            validationErrors.ToList().ForEach(ve =>
            {
                var errorStrings = ve.Select(x => x.ErrorMessage);
                errorStrings.ToList().ForEach(em =>
                {
                    errorMessages.Add(em);
                });
            });
            return errorMessages;
        }
        











    }
}
