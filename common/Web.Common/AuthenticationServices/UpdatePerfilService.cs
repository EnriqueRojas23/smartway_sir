namespace Web.Common.AuthenticationServices
{
    using System.Web;
    using ServiceAgents.Common;
    using global::Seguridad.Common;
    using QueryContracts.Common;
    using System;

    public class UpdatePerfilService
    {
        public void Update(string codigousuario, int? idperfil)
        {
            var datosCnxParameters = new ObtenerDatosConexionParameter
            {
                IdRol = idperfil,
                CodigoUsuario = codigousuario,
                CodigoSistema = null
            };
            var resultadoDatosCnx = ((ObtenerDatosConexionResult)datosCnxParameters.Execute());

            if (resultadoDatosCnx != null){
                this.UpdateConnecctionData(resultadoDatosCnx.Usuario, resultadoDatosCnx.Clave);
                this.UpdatePerfil(codigousuario, resultadoDatosCnx.Rol_int_id, resultadoDatosCnx.Rol_str_alias);
            }
        }

        private void UpdatePerfil(string CodigoUsuario, int IdPerfil, String NombrePerfil)
        {
            SessionWrapper.Perfil = new Perfil
            {
                IdPerfil = IdPerfil,
                NombrePerfil = NombrePerfil,
                ListaMenuOpcion = null
            };

        }


        private void UpdateConnecctionData(string user, string dbPassword)
        {
            var session = HttpContext.Current.Session;
            session["dbUser"] = user;
            session["dbPassword"] = dbPassword;
        }
    }
}