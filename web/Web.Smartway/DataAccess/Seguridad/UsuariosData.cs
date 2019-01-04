using System;
using System.Text;
using System.Linq;
using ServiceAgents.Common;
using QueryContracts.Smartway.Seguridad.Result;
using System.Collections.Generic;
using QueryContracts.Smartway.Seguridad.Parameters;
using Web.Smartway.Areas.Seguridad.Models.Usuarios;
using System.Web.Mvc;
using CommandContracts.Smartway.Seguridad;
using CommandContracts.Smartway.Seguridad.Output;
using AutoMapper;
using QueryContracts.Smartway.Account.Results;
using QueryContracts.Smartway.Account.Parameters;




namespace Web.Smartway.DataAccess.Seguridad
{
    public sealed class UsuariosData
    {
        public static IList<ListarUsuariosDto> GetListarUsuarios(ListarUsuariosModel modelo)
        {
            var parameter = new ListarUsuariosParameter() { rol_int_id = modelo.IdRol, usr_str_nombre_apellido = modelo.NombreCompleto, usr_str_red = modelo.AliasUsuario  };
            var result = (ListarUsuariosResult)parameter.Execute();
            return result == null ? new List<ListarUsuariosDto>() : result.Hits.ToList();
        }
        public static bool AsignarClientesUsuarios(ControllerContext context, int usr_int_id, string[] Clientes)
        {
            var command = new AsignarClientesUsuariosCommand();
            command.usr_int_id = usr_int_id;
            command.clientes_array = Clientes;
            return ((AsignarClientesUsuariosOutput)command.Execute(context)).ClientesAsignados;
        }

        public static ObtenerDatosBasicosUsuarioResult GetdatosBasicosUsuario(int? piduser, string pured)
        {
            var parameter = new ObtenerDatosBasicosUsuarioParameter() { usr_int_id = piduser, usr_str_red = pured };
            var result = (ObtenerDatosBasicosUsuarioResult)parameter.Execute();
            return result;
        }
        public static ObtenerUsuarioResult1 ObtenerUsuario(int? piduser)
        {
            var parameter = new ObtenerUsuarioParameter1() { Usr_int_id = piduser };
            var result = (ObtenerUsuarioResult1)parameter.Execute();
            return result;
        }

        public static int AsignarRolesUsuarios(ControllerContext context, string psis_str_siglas, int pusr_int_id, int[] prol_int_id_array)
        {
            var command = new AsignarRolesUsuariosCommand();
            command.rol_int_id_array = prol_int_id_array;
            command.sis_str_siglas = psis_str_siglas;
            command.usr_int_id = pusr_int_id;
            return ((AsignarRolesUsuariosOutput)command.Execute(context)).nro_roles_procesados;
        }
        public static int DesbloquearUsuario(int usuario)
        {

            var Validar = new DesbloquearUsuarioParameter()
            {
                id = usuario
                ,

            };
            var existe = (DesbloquearUsuarioResult)Validar.Execute();
            return existe.result;
        }

        public static string InsertarUsuario(ControllerContext context, InsertarModificarUsuarioModel modelo)
        {

            if (!modelo.Usr_int_id.HasValue)
            {
                var Validar = new ValidarExisteUsuarioParameter() { 
                    usr_str_email = modelo.Usr_str_email
                    , usr_str_red = modelo.Usr_str_red.Trim() 
                };
                var existe = (ValidarExisteUsuarioResult)Validar.Execute();
                if (existe.Existe > 0)
                    return "3";

                modelo.Usr_bool_aprobado = true;
                modelo.Usr_bool_bloqueado  = false;
 
            }
            Mapper.CreateMap<InsertarModificarUsuarioModel, InsertarModificarUsuarioCommand>();
            var command = Mapper.Map<InsertarModificarUsuarioModel, InsertarModificarUsuarioCommand>(modelo);
            var res = (InsertarModificarUsuarioOutput)command.Execute(context);
            if (res.usr_int_id == 0) return "3";
            //if (modelo.usr_str_tipoacceso == "1")
            //{
            //    var parameter = new GenerarPasswordParameter() { IdUsuario = res.usr_int_id };
            //    var result = (GenerarPasswordResult)parameter.Execute();
            //}
            if (!modelo.Usr_int_id.HasValue)
            {
               
               

                if (!modelo.Usr_int_id.HasValue)
                {

                    var parameter = new GenerarPasswordParameter() { IdUsuario = res.usr_int_id };
                    var result = (GenerarPasswordResult)parameter.Execute();
                    //Envio de mail
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
                    sb.Append("												<div style='text-align:center'><span style='color:rgb(255,255,255);font-weight:bold'>Smartway- On Line");
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
                    sb.Append("													Sr(a). " + modelo.Usr_str_nombre + "");
                    sb.Append("												</td>");
                    sb.Append("											</tr>");
                    sb.Append("											<tr>");
                    sb.Append("												<td colspan='10' align='left' valign='top' style='padding:10px;font-family:Arial,Helvetica,sans-serif;color:rgb(38,38,38);");
                    sb.Append("                                         font-size:12px;background-color:rgb(255,255,255);width:190px '  colspan='4'>");
                    sb.Append("												Bienvenido a la web Smartway On Line, para poder ingresar a la web, ingrese al portal las credenciales proporcionados por Smartway. Se ha creado su usuario satisfactoriamente ");
                    sb.Append("                                        proporcionados por Smartway.");
                    sb.Append("												</td>");
                    sb.Append("											</tr>");
                    sb.Append("												<tr>");
                    sb.Append("												<td colspan='10' align='left' valign='top' style='padding:10px;font-family:Arial,Helvetica,sans-serif;color:rgb(38,38,38);");
                    sb.Append("                                             font-size:14px;font-weight:bold;background-color:rgb(255,255,255)'  colspan='4'>");
                    sb.Append("													<span style='font-family:Arial,Helvetica,sans-serif;color:rgb(38,38,38)'>Se ha creado su usuario satisfactoriamente.</span> ");
                    sb.Append("");
                    sb.Append("												</td>");
                    sb.Append("											</tr>");
                    sb.Append("											<tr>");
                    sb.Append("												<td align='left' valign='top' style='padding:10px;font-family:Arial,Helvetica,sans-serif;color:rgb(38,38,38);");
                    sb.Append("ont-size:12px;background-color:rgb(255,255,255);width:190px'>");
                    sb.Append("													Usuario : " + modelo.Usr_str_red + "");
                    sb.Append("												</td>");
                    sb.Append("												<td align='left' valign='top' style='padding:10px;font-family:Arial,Helvetica,sans-serif;color:rgb(38,38,38);");
                    sb.Append("ont-size:12px;background-color:rgb(255,255,255);width:190px'>");
                    sb.Append("												</td>");
                    sb.Append("												<td align='left' valign='top' style='padding:10px;font-family:Arial,Helvetica,sans-serif;color:rgb(38,38,38);");
                    sb.Append("ont-size:12px;background-color:rgb(255,255,255);width:190px'>");
                    sb.Append("													Clave : " + result.password + " ");
                    sb.Append("												</td>");
                    sb.Append("												<td align='left' valign='top' style='padding:10px;font-family:Arial,Helvetica,sans-serif;color:rgb(38,38,38);");
                    sb.Append("ont-size:12px;background-color:rgb(255,255,255);width:190px'>	");
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
                    //bool correo = MailHelper.EnviarMail(result.mail, "[Se ha registrado un nuevo usuario]", sb.ToString(), true);
                    //if (correo)
                    //    return "1";
                    //else return "2";
                }
                else
                {
                    return "1";
                }


                return "1";
            }
            else
            {
                return "1";
            }

            

        }
        public static string EliminarUsuario(int idUsuerio)
        {
            var parameter = new EliminarUsuarioParameter() { IdUsuario = idUsuerio };
            var result =(EliminarUsuarioResult) parameter.Execute();
            return result.Mensaje;
        }


        public static string ResetarContraseña(ControllerContext context, int pusr_int_id)
        {
            var comando = new ResetarPasswordCommand() {  usr_int_id = pusr_int_id };
            var res = (ResetarPasswordOutput)comando.Execute(context);

            if (res == null)
                return null;
            StringBuilder sb = new StringBuilder();
            sb.Append("<table width='100%' cellpadding='0' cellspacing='0' border='0' dir='ltr' style='font-size:16px;background-color:rgb(227,225,225)'>");
            sb.Append("<tbody>");
            sb.Append("<tr>");
            sb.Append("        <td align='center' valign='top' style='margin:0;padding:40'>");
            sb.Append("            <table align='center' border='0' cellspacing='0' cellpadding='0' width='700' bgcolor='#1ab394' style='width:700px;border:1px solid ");
            sb.Append("         transparent;order-radius:13px;margin:auto;background-color:#18a689'> ");
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
            sb.Append("												<div style='text-align:center'><span style='color:rgb(255,255,255);font-weight:bold'>Smartway - On Line");
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
            sb.Append("													Sr(a). " + res.Nombres + "");
            sb.Append("												</td>");
            sb.Append("											</tr>");
            sb.Append("											<tr>");
            sb.Append("												<td colspan='4' align='left' valign='top' style='padding:10px;font-family:Arial,Helvetica,sans-serif;color:rgb(38,38,38);");
            sb.Append("                                         font-size:12px;background-color:rgb(255,255,255);width:190px '  colspan='4'>");
            sb.Append("													Bienvenido a la web Smartway On Line, para poder ingresar a la web, digite su usuario y contrasena proporcionado  ");
            sb.Append("                                        proporcionados por Smartway.");
            sb.Append("												</td>");
            sb.Append("											</tr>");
            sb.Append("												<tr>");
            sb.Append("												<td colspan='2' align='left' valign='top' style='padding:10px;font-family:Arial,Helvetica,sans-serif;color:rgb(38,38,38);");
            sb.Append("                                             font-size:14px;font-weight:bold;background-color:rgb(255,255,255)'  colspan='4'>");
            sb.Append("													<span style='font-family:Arial,Helvetica,sans-serif;color:rgb(38,38,38)'>Recordatorio de Password  ");
            sb.Append(".</span>");
            sb.Append("												</td>");
            sb.Append("											</tr>");
            sb.Append("											<tr>");
            sb.Append("												<td align='left' valign='top' style='padding:10px;font-family:Arial,Helvetica,sans-serif;color:rgb(38,38,38);");
            sb.Append("ont-size:12px;background-color:rgb(255,255,255);width:190px'>");
            sb.Append("													Usuario : " + res.Usuario + "");
            sb.Append("												</td>");
            sb.Append("												<td align='left' valign='top' style='padding:10px;font-family:Arial,Helvetica,sans-serif;color:rgb(38,38,38);");
            sb.Append("ont-size:12px;background-color:rgb(255,255,255);width:190px'>");
            sb.Append("												</td>");
            sb.Append("												<td align='left' valign='top' style='padding:10px;font-family:Arial,Helvetica,sans-serif;color:rgb(38,38,38);");
            sb.Append("ont-size:12px;background-color:rgb(255,255,255);width:190px'>");
            sb.Append("													Password : " + res.PasswordClaro + " ");
            sb.Append("												</td>");
            sb.Append("												<td align='left' valign='top' style='padding:10px;font-family:Arial,Helvetica,sans-serif;color:rgb(38,38,38);");
            sb.Append("ont-size:12px;background-color:rgb(255,255,255);width:190px'>	");
            sb.Append("												</td>");
            sb.Append("											</tr>");
            sb.Append("									");
            sb.Append("											'");
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

           //bool correo = MailHelper.EnviarMail(res.Correo, "[NOL] Envío de password generado", sb.ToString(), true);
            return res.PasswordClaro;
        }
        public static  CambiarContrasenaResult   CambiarPassword(int idUsuario, string Password)
        {
            var parameter = new CambiarContrasenaParameter()
            {
                IdUsuario = idUsuario
                ,password = Password
            };
           var result = (CambiarContrasenaResult)parameter.Execute();
            return result;

 
        }
        public static ObtenerPasswordResult RecordarPassword(string email)
        {
            var parameter = new ObtenerPasswordParameter()
            {
                usr_str_email = email
            };
            var result = (ObtenerPasswordResult)parameter.Execute();

            if (result == null)
                return null;
               StringBuilder sb = new StringBuilder();
                sb.Append("<table width='100%' cellpadding='0' cellspacing='0' border='0' dir='ltr' style='font-size:16px;background-color:rgb(227,225,225)'>");
                sb.Append("<tbody>'");
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
                sb.Append("							<tr>'");
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
                sb.Append("												<div style='text-align:center'><span style='color:rgb(255,255,255);font-weight:bold'>Smartway - On Line");
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
                sb.Append("													Sr(a). " + result.usr_str_nombre +"");
                sb.Append("												</td>'");
                sb.Append("											</tr>");
                sb.Append("											<tr>");
                sb.Append("												<td colspan='2' align='left' valign='top' style='padding:10px;font-family:Arial,Helvetica,sans-serif;color:rgb(38,38,38);");
                sb.Append("                                         font-size:12px;background-color:rgb(255,255,255);width:190px '  colspan='4'>");
                sb.Append("													Bienvenido a la web Smartway On Line, para poder ingresar a la web, digite su usuario y contrasena proporcionado  ");
                sb.Append("                                        proporcionados por Smartway.");
                sb.Append("												</td>");
                sb.Append("											</tr>");
                sb.Append("												<tr>");
                sb.Append("												<td colspan='2' align='left' valign='top' style='padding:10px;font-family:Arial,Helvetica,sans-serif;color:rgb(38,38,38);");
                sb.Append("                                             font-size:14px;font-weight:bold;background-color:rgb(255,255,255)'  colspan='4'>");
                sb.Append("													<span style='font-family:Arial,Helvetica,sans-serif;color:rgb(38,38,38)'>Recordatorio de Password  ");
                sb.Append(".</span>");
                sb.Append("												</td>");
                sb.Append("											</tr>");
                sb.Append("											<tr>");
                sb.Append("												<td align='left' valign='top' style='padding:10px;font-family:Arial,Helvetica,sans-serif;color:rgb(38,38,38);");
                sb.Append("ont-size:12px;background-color:rgb(255,255,255);width:190px'>");
                sb.Append("													Usuario : "+ result.usr_str_red + "");
                sb.Append("												</td>");
                sb.Append("												<td align='left' valign='top' style='padding:10px;font-family:Arial,Helvetica,sans-serif;color:rgb(38,38,38);");
                sb.Append("ont-size:12px;background-color:rgb(255,255,255);width:190px'>");
                sb.Append("												</td>");
                sb.Append("												<td align='left' valign='top' style='padding:10px;font-family:Arial,Helvetica,sans-serif;color:rgb(38,38,38);");
                sb.Append("ont-size:12px;background-color:rgb(255,255,255);width:190px'>");
                sb.Append("													Password : "+  result.usr_str_password +" ");
                sb.Append("												</td>");
                sb.Append("												<td align='left' valign='top' style='padding:10px;font-family:Arial,Helvetica,sans-serif;color:rgb(38,38,38);");
                sb.Append("ont-size:12px;background-color:rgb(255,255,255);width:190px'>	");
                sb.Append("												</td>");
                sb.Append("											</tr>");
                sb.Append("									");
                sb.Append("											'");
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
          
                bool correo = MailHelper.EnviarMail(email, "[Envío de password]", sb.ToString(), true);
                if (correo)
                    return result;
                else return null;




          

        }



        //internal static IList<ListarClientesCRMDto> ListarClientes()
        //{

        //    var cliente = new ServiceAgents.Core.CoreBackendClient();
        //    var parameter = new ListarClientesCRMParameter ();
        //    var resultado = (ListarClientesCRMResult)cliente.ExecuteQuery(parameter);
        //    return resultado == null ? new List<ListarClientesCRMDto>() : resultado.Hits.ToList();

        //}
        //public static IList<ListarClientesUsuarioDto> ListarClientesUsuarios(int usuario)
        //{
        //    var parameter = new ListarClientesUsuarioParameter() { usr_int_id = usuario };
        //    var result = (ListarClientesUsuarioResult)parameter.Execute();
        //    return result == null ? new List<ListarClientesUsuarioDto>() : result.Hits.ToList();
        //}

    }
}
