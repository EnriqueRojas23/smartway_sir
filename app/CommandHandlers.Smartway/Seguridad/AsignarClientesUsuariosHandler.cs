
using CommandContracts.Common;
using CommandContracts.Smartway.Seguridad;
using CommandContracts.Smartway.Seguridad.Output;
using CommandHandlers.Common;
using Domain.Common.Contracts;
using Domain.Smartway.Seguridad;
using System.Collections.Generic;
using System.Linq;

namespace CommandHandlers.Smartway.Seguridad
{
    public class AsignarClientesUsuariosHandler : ICommandHandler<AsignarClientesUsuariosCommand>
    {
        private readonly IRepository<UsuarioCliente> _ClientesUsuario;

        public AsignarClientesUsuariosHandler(IRepository<UsuarioCliente> pClientesUsuario)
        {
            this._ClientesUsuario = pClientesUsuario;
        }

        public CommandResult Handle(AsignarClientesUsuariosCommand command)
        {
            if (command == null) throw new System.ArgumentException("Se requiere el parametro command.");
            
            var ucl_int_id_array_delete = new List<long>();

            //activo Clientes
            var dominio_cliente_usuario_array = _ClientesUsuario.Get(x => x.usr_int_id == command.usr_int_id).ToList();
 
            foreach (var cliente in dominio_cliente_usuario_array)
            {
                var dominio_cliente_eliminar = _ClientesUsuario.Get(x =>  x.usr_int_id == command.usr_int_id && x.ruc_str_numero == cliente.ruc_str_numero).LastOrDefault();
                if (dominio_cliente_eliminar != null) _ClientesUsuario.Delete(dominio_cliente_eliminar);
            }
            _ClientesUsuario.Commit();
            

            //ingresando Clientes nuevos
            UsuarioCliente dominio_Cliente_insertar;

            foreach (var cliente in command.clientes_array)
            {
                dominio_Cliente_insertar = new UsuarioCliente()
                {
                    usr_int_id = command.usr_int_id,
                    ruc_str_numero = cliente
                };
                _ClientesUsuario.Add(dominio_Cliente_insertar);
            }
            _ClientesUsuario.Commit();

            return new AsignarClientesUsuariosOutput() { ClientesAsignados = true };
            
        }


    }
}
