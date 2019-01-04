
namespace Web.Smartway.DataAccess.Seguridad
{
    using System.Text;

    using QueryContracts.Smartway.Account.Parameters;
    using QueryContracts.Smartway.Account.Results;
    using System;
    using System.Linq;

    using ServiceAgents.Common;

    public static class AccountData
    {
        public static string ValidateUser(string username, string password)
        {
            var msjerr = new StringBuilder();

            var parametros = new ValidarUsuarioParameter { Usr_str_red = username, Usr_str_password = password };

            try
            {
                var resultado = (ValidarUsuarioResult)parametros.Execute();
                if (resultado == null) throw new Exception("Al conectarse a la base de datos");

                if (resultado.Usr_int_pwdvalido == 0)
                {
                    msjerr.AppendLine("Verifique su Nombre de Usuario y/o Contraseña.");
                    msjerr.AppendLine("Frase para recordar clave: " + resultado.Usr_str_recordarpwd);

                }
                else if (resultado.Usr_int_rolinvalido == 0)
                {
                    msjerr.AppendLine("El usuario no contiene roles validos.");
                }
                else if (resultado.Usr_int_bloqueado == 1)
                {
                    msjerr.AppendLine("El usuario está bloqueado");
                }
                else if (resultado.Usr_int_aprobado == 0)
                {
                    msjerr.AppendLine("El usuario no está activo");
                }

                if (String.IsNullOrEmpty(msjerr.ToString()) == false)
                    return msjerr.ToString();

                return "OK";
            }
            catch (Exception ex)
            {
                return "El usuario y/o la contraseña no existe";//ex.Message;
            }
        }

        public static ObtenerUsuarioResult ObtenerUsuario(string username, ref string res)
        {
            return AccountData.ObtenerUsuario(username, null, ref res);
        }

        public static ObtenerUsuarioResult ObtenerUsuario(int idusuario, ref string res)
        {
            return AccountData.ObtenerUsuario(null, idusuario, ref res);
        }

        public static ObtenerUsuarioResult ObtenerUsuario(string username, int? idusuario, ref string res)
        {
            var parametro = new ObtenerUsuarioParameter { Usr_str_red = username, Usr_int_id = idusuario };
            var resultado = (ObtenerUsuarioResult)parametro.Execute();

            if(resultado == null) { res = "El usuario ingresado no existe."; }
            else if (resultado != null && resultado.ListaRoles.Any() == false) { res = "El usuario no tienen ningun rol asignado."; }

            return resultado;
        }

        
    }
}
