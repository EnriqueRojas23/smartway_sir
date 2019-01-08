
using CommandContracts.Common;
using CommandContracts.Smartway.Seguridad;
using CommandContracts.Smartway.Seguridad.Output;
using CommandHandlers.Common;
using Domain.Common.Contracts;
using Domain.Smartway.Seguridad;
using Domain.Smartway.Seguridad.Exceptions;
using System.Collections.Generic;
using System.Linq;

namespace CommandHandlers.Smartway.Seguridad
{
    public class AsignarRolesUsuariosHandler : ICommandHandler<AsignarRolesUsuariosCommand>
    {
        private readonly IRepository<SistemaRolUsuario> _sistemarolusuario;
        private readonly IRepository<Sistema> _sistema;
        private readonly IRepository<SistemaRol> _sistemarol;


        public AsignarRolesUsuariosHandler(IRepository<SistemaRolUsuario> psistemarolusuario, IRepository<Sistema> psistema,IRepository<SistemaRol> psistemarol)
        {
            this._sistemarolusuario = psistemarolusuario;
            this._sistema = psistema;
            this._sistemarol = psistemarol;
        }

        public CommandResult Handle(AsignarRolesUsuariosCommand command)
        {
            if (command == null) throw new System.ArgumentException("Se requiere el parametro command."); //SistemaRolUsuarioException("ddd")
            var rol_int_id_array_delete = new List<int>();
            var sis_int_id = GetSistemaId(command.sis_str_siglas);
            
            //Listado de id que se van a eliminar
            var dominio_rol_usuario_array = _sistemarolusuario.Get(x => x.sis_int_id == sis_int_id && x.usr_int_id == command.usr_int_id);
            foreach (var dominiorol in dominio_rol_usuario_array)
            {
                var obj = command.rol_int_id_array.LastOrDefault(x => x == dominiorol.rol_int_id);
                if (obj == null || obj == 0)
                    rol_int_id_array_delete.Add(dominiorol.rol_int_id);
            }

            //activo roles
            foreach (var rol_int_id in rol_int_id_array_delete)
            {
                var dominio_rol_eliminar = _sistemarolusuario.Get(x => x.sis_int_id == sis_int_id && x.usr_int_id == command.usr_int_id && x.rol_int_id == rol_int_id).LastOrDefault();
                if (dominio_rol_eliminar != null)  _sistemarolusuario.Delete(dominio_rol_eliminar);
            }
            _sistemarolusuario.Commit();
            

            //ingresando roles nuevos
            var contador = 0;
            foreach (var rol_int_id_command in command.rol_int_id_array)
            {
               

                var dominio_rol_insertar = _sistemarolusuario.Get(x => x.sis_int_id == sis_int_id && x.usr_int_id == command.usr_int_id && x.rol_int_id == rol_int_id_command).LastOrDefault();
                if (dominio_rol_insertar == null)
                {
                    //agregar sistemarol 

                    var dominio_sistemarol = _sistemarol.Get(x => x.rol_int_id == rol_int_id_command && x.sis_int_id == sis_int_id).LastOrDefault(); 
                    if (dominio_sistemarol == null)
                    {
                        dominio_sistemarol = new SistemaRol();
                        dominio_sistemarol.sis_int_id = sis_int_id;
                        dominio_sistemarol.rol_int_id = rol_int_id_command;
                        _sistemarol.Add(dominio_sistemarol);
                        _sistemarol.Commit();
                    }

                    dominio_rol_insertar = new SistemaRolUsuario() 
                    {
                        rol_int_id = rol_int_id_command,
                        sis_int_id = sis_int_id,
                        usr_int_id = command.usr_int_id,
                        rol_bit_prin = false
                    };
                    _sistemarolusuario.Add(dominio_rol_insertar);
                    contador++;

                }

            }
            _sistemarolusuario.Commit();

            return new AsignarRolesUsuariosOutput() { nro_roles_procesados = contador };
            
        }

        private int GetSistemaId(string psis_str_siglas)
        {
            var sistema = _sistema.Get(x => x.sis_str_siglas == psis_str_siglas).LastOrDefault();
            if (sistema == null) throw new SistemaException("No existe el sistema para la sigla " + psis_str_siglas);
            return sistema.sis_int_id;
        }

    }
}
