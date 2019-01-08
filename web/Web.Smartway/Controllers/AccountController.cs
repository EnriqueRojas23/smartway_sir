using Seguridad.Common;
using System;
using System.Linq;
//using System.DirectoryServices.AccountManagement;
//using System.ServiceModel;
using System.Web.Mvc;
using System.Web.Security;
using Web.Common.AuthenticationServices;
using Web.Common.Controllers;
using Web.Smartway.Models.Account;
using Web.Smartway.Security;
using UserAuthentication;
using System.Configuration;


using Web.Smartway.DataAccess.Seguridad;


namespace Web.Smartway.Controllers
{

    public class AccountController : BaseController
    {
        //
        // GET: /Account/

        public ActionResult Index()
        {
            return View();
        }


        [HttpGet]
        [AllowAnonymous]
        public ActionResult SignIn(string returnUrl = "")
        {
            var modelo = new SignInModel();
            if (User.Identity.IsAuthenticated)
            {
                return SignOut();
            }
            modelo.ReturnUrl = returnUrl;
            return View(modelo);
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult SignIn(SignInModel modelo, string returnUrl = "")
        {
            var msj = string.Empty;
            var usuariovalido = false;
           // var dominio = ConfigurationManager.AppSettings["dominio"].ToString();
            try
            {
                if (ModelState.IsValid)
                {
                    //if (modelo.ModoAutenticacion == "AD")
                    //{
                    //    //using (PrincipalContext context = new PrincipalContext(ContextType.Domain))
                    //    //{
                    //        //usuariovalido = context.ValidateCredentials(modelo.CodigoUsuario, modelo.Password);
                    //        //Session["mensaje_validateuser"] = usuariovalido ? "" : "Verifique su Nombre de Usuario y/o Contraseña.";

                    //     string adPath = "LDAP://" + System.Configuration.ConfigurationManager.AppSettings["DefaultActiveDirectoryServer"];
                    //     ActiveDirectoryValidator adAuth = new ActiveDirectoryValidator(adPath);

                    //     if (adAuth.IsAuthenticated(dominio, modelo.CodigoUsuario, modelo.Password))
                    //     {
                    //         usuariovalido = true;
                    //         Session["mensaje_validateuser"] = false;
                    //         Membership.ValidateUser(modelo.CodigoUsuario, modelo.Password);
                    //     }
                    //     else
                    //     {
                    //         usuariovalido = false;
                    //         Session["mensaje_validateuser"] = "Verifique su Nombre de Usuario y/o Contraseña.";
                    //     }

                    //   // }
                    //}
                    //else if (modelo.ModoAutenticacion == "EX")
                    //{
                    usuariovalido = Membership.ValidateUser(modelo.CodigoUsuario, modelo.Password);
                    //}

                    if (Session["mensaje_validateuser"] != null) msj = Convert.ToString(Session["mensaje_validateuser"]);
                    if (string.IsNullOrEmpty(msj) == false) ModelState.AddModelError("", msj);

                    if (usuariovalido)
                    {
                        var usuario = (CustomMembershipUser)Membership.GetUser(modelo.CodigoUsuario);
                        if (usuario != null && Session["mensaje_validateuser"] == null)
                        {
                            ActualizarRol(usuario);
                            FormsAuthentication.RedirectFromLoginPage(modelo.CodigoUsuario, false);

                        }
                        else
                        {
                            ModelState.AddModelError("", Convert.ToString(Session["mensaje_validateuser"]));
                        }
                    }
                }

            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", "Hubo un error al momento de obtener el usuario");
                //ModelState.AddModelError("", ex.ToString());
            }

            var perfil = ViewBag.Perfil;

            return View(modelo);

        }

        private void ActualizarRol(CustomMembershipUser usuario)
        {
            var username = usuario.UserName;
            var idrol = usuario.UserRoleId;

            var update = new UpdatePerfilService();
            update.Update(username, idrol);
        }

        public ActionResult CambiarRol(int idr)
        {
            var username = this.Usuario.CodigoUsuario;
            var update = new UpdatePerfilService();
            update.Update(username, idr);
            return RedirectToAction("Index", "Account", new { area = "" });
        }
        
        [AllowAnonymous]
        public ActionResult SignOut()
        {
            FormsAuthentication.SignOut();
            Session.Abandon();
            return RedirectToAction("Index", "Account");
        }

        [AllowAnonymous]
        public JsonResult GetLocalUser()
        {
            try
            {
               // var usr1 = Environment.UserDomainName.ToString() + "\\" + Environment.UserName.ToString(); 
                //var user = Request.LogonUserIdentity.Name;
                return Json(new { res = true, username = "" });
            }
            catch
            {
                return Json(new { res = false, msj = "No se pudo recuperar el usuario coorporativo"});
            }
        }

        [AllowAnonymous]
        public ActionResult ForgotPassword()
        {


            return View(new ForgotPasswordModel());
        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult ForgotPassword(ForgotPasswordModel modelo)
        {
            var result = UsuariosData.RecordarPassword(modelo.Email);
            if(result!=null)
                            return RedirectToAction("ConfirmPassword", "Account");
            else
                return RedirectToAction("ConfirmPasswordError", "Account");
        }
        [AllowAnonymous]
        public ActionResult ConfirmPassword()
        {

            return View();
        }
        [AllowAnonymous]
        public ActionResult ConfirmPasswordError()
        {

            return View();
        }

        [HttpGet]
        [AllowAnonymous]
        public ActionResult SignInChange(string returnUrl = "",string id="0")
        {
           // Seguridad.Common.Usuario
            var algo = ViewBag.Usuario;
            var result = UsuariosData.ResetarContraseña(this.ControllerContext, int.Parse(id));
            var modelo = new SignInModel();
            if (User.Identity.IsAuthenticated)
            {
                return SignOut();
            }
            modelo.ReturnUrl = returnUrl;
            return View(modelo);
        }
    }
}
