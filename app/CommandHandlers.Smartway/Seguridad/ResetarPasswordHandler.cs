using System;
using System.Linq;
using CommandContracts.Common;
using CommandContracts.Smartway.Seguridad;
using CommandHandlers.Common;
using Domain.Common.Contracts;
using Domain.Smartway.Seguridad;
using Domain.Smartway.Seguridad.Exceptions;
using QueryHandlers.Smartway.Seguridad;
using QueryContracts.Smartway.Seguridad.Parameters;
using QueryContracts.Smartway.Seguridad.Result;
using CommandContracts.Smartway.Seguridad.Output;


namespace CommandHandlers.Smartway.Seguridad
{
    public class ResetarPasswordHandler : ICommandHandler<ResetarPasswordCommand>
    {
        private readonly IRepository<Usuario> _usuario;
        public ResetarPasswordHandler(IRepository<Usuario> pusuario)
        {
            this._usuario = pusuario;
        }

        public CommandResult Handle(ResetarPasswordCommand command)
        {
            var dominio_usuario = _usuario.Get(x => x.usr_int_id == command.usr_int_id).LastOrDefault();
            if (dominio_usuario == null) throw new UsuarioException("No se encontro el usuario");

            dominio_usuario.usr_dat_fecvctopwd = DateTime.Now.AddDays(30);
            //dominio_usuario.usr_dat_ultfecbloqueo = 1;
           // dominio_usuario.usr_int_aprobado = 1;
            //dominio_usuario.usr_int_bloqueado = 0;
          //  dominio_usuario.usr_int_cambiarpwd = 1;
            dominio_usuario.usr_int_numintentos = 0;

            var nuevopassword = GenerarCadena();

            var query = new EncriptarPasswordQuery();
            var parameter = new EncriptarPasswordParameter();
            parameter.usr_int_id = command.usr_int_id;
            parameter.usr_str_password = nuevopassword;
            var result = (EncriptarPasswordResult)query.Handle(parameter);

            _usuario.Commit();
            return new ResetarPasswordOutput() { Correo= dominio_usuario.usr_str_email
                , Nombres = dominio_usuario.usr_str_nombre
                , Usuario = dominio_usuario.usr_str_red
                ,PasswordClaro = nuevopassword };
            
        }

        private string GenerarCadena()
        { 
            Random obj = new Random();
    	    string posibles = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
	        int longitud = posibles.Length;
	        char letra;
	        int longitudnuevacadena = 10;
	        string nuevacadena = "";
	
            for (int i = 0; i < longitudnuevacadena; i++)
	        {
	            letra = posibles[obj.Next(longitud)];
	            nuevacadena += letra.ToString();
	        }
            return nuevacadena;
        }
    }
}
