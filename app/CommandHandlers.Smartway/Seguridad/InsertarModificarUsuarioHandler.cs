using System;
using System.Linq;
using CommandContracts.Common;
using CommandContracts.Smartway.Seguridad;
using CommandHandlers.Common;
using Domain.Common.Contracts;
using Domain.Smartway.Seguridad;
using CommandContracts.Smartway.Seguridad.Output;


namespace CommandHandlers.Smartway.Seguridad
{
    public class InsertarModificarUsuarioHandler : ICommandHandler<InsertarModificarUsuarioCommand>
    {
        private readonly IRepository<Usuario> _usuario;
        private readonly IRepository<Sistema> _sistema;

        public InsertarModificarUsuarioHandler(IRepository<Usuario> pusuario, IRepository<Sistema> psistema)
        {
            this._usuario = pusuario;
            this._sistema = psistema;
        }

        public CommandResult Handle(InsertarModificarUsuarioCommand command)
        {
            Usuario dominio_usuario = null;
            if (command.usr_int_id.HasValue) {
                dominio_usuario = _usuario.Get(x => x.usr_int_id == command.usr_int_id).LastOrDefault();
                if( _usuario.Get(x => x.usr_str_red.Equals(command.usr_str_red) && !x.usr_int_id.Value.Equals(command.usr_int_id.Value)).LastOrDefault() != null)
                    return new InsertarModificarUsuarioOutput() { usr_int_id = 0 };
            }
            if (dominio_usuario == null) dominio_usuario = new Usuario();

           
            dominio_usuario.usr_str_apellidos = command.usr_str_apellidos;
            dominio_usuario.usr_str_email = command.usr_str_email;
            dominio_usuario.usr_str_nombre = command.usr_str_nombre;
            dominio_usuario.usr_str_red = command.usr_str_red;
            dominio_usuario.usr_dat_fecvctousuario = command.usr_dat_fecvctousuario;
            dominio_usuario.usr_str_tipoacceso = command.usr_str_tipoacceso;
            dominio_usuario.usr_int_aprobado = command.usr_int_aprobado;
            dominio_usuario.usr_int_bloqueado = command.usr_int_bloqueado;
            dominio_usuario.usr_int_cambiarpwd = command.usr_int_cambiarpwd;
            dominio_usuario.idcliente = command.idcliente;
            dominio_usuario.callcenter = command.callcenter;
            dominio_usuario.idpartner = command.idpartner;
            dominio_usuario.idsucursal= command.idsucursal;
            dominio_usuario.idtipousuario = command.idtipousuario;
            dominio_usuario.tiposproducto = command.tiposproducto;





            if (!command.usr_int_id.HasValue) {
                dominio_usuario.usr_dat_fecregistro = DateTime.Now;
                dominio_usuario.usr_dat_fecvctopwd = DateTime.Now.AddDays(30);
                
                dominio_usuario.usr_int_numintentos = 0;
                dominio_usuario.usr_int_online = 0;//command.usr_int_online;
                _usuario.Add(dominio_usuario);
            }
            _usuario.Commit();

            return new InsertarModificarUsuarioOutput() { usr_int_id = dominio_usuario.usr_int_id }; 
        }
    }
}
