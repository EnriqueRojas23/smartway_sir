

using CommandContracts.Smartway.Mantenimiento;
using CommandContracts.Smartway.Mantenimiento.Output;
using CommandHandlers.Common;
using Domain.Common.Contracts;
using Domain.Smartway.Mantenimiento;
using Domain.Smartway.Mantenimiento.Exceptions;
using System;
using System.Linq;
namespace CommandHandlers.Smartway
{
    public class InsertarActualizarClienteHandler : ICommandHandler<InsertarActualizarClienteCommand>
    {
        private readonly IRepository<Cliente> _ClienteRepository;


        public InsertarActualizarClienteHandler(IRepository<Cliente> pClienteRepository)
        {
            this._ClienteRepository = pClienteRepository;
        }

        public CommandContracts.Common.CommandResult Handle(InsertarActualizarClienteCommand command)
        {
            if (command == null) throw new ArgumentException("Tiene que ingresar una cliente");


           Cliente  dominio = null;
            if (command.idcliente.HasValue)
            {
                dominio = _ClienteRepository.Get(x => x.idcliente == command.idcliente).LastOrDefault();
                var existe_documento = _ClienteRepository.Get(x => x.numerodocumento.Equals(command.numerodocumento)
                && x.idcliente != command.idcliente).LastOrDefault();
                if(existe_documento != null)
                    throw new ClienteException("El número de documento ya existe");
            }
            else
            {
                dominio = _ClienteRepository.Get(x => x.numerodocumento.Equals(command.numerodocumento)).LastOrDefault();
                if (dominio != null)
                {
                    throw new ClienteException("El número de documento ya existe");
                }
                else
                {
                    dominio = new Cliente();
                }
            }
            switch (command.__tipooperacion)
            {
                case 1:
                    dominio.nombre = command.nombre;
                    dominio.numerodocumento = command.numerodocumento;
                    dominio.idtipodocumento = command.idtipodocumento;
                    dominio.contacto = command.contacto;
                    dominio.activo = true;
                    dominio.telefono = command.telefono;
                    dominio.celular = command.celular;
                    dominio.email = command.email;
                    dominio.idsexo = command.idsexo;
                    break;
                case 2:
                    dominio.activo = command.activo;
                    break;
                default:
                    break;
            }

            try
            {
                if (!command.idcliente.HasValue)
                    _ClienteRepository.Add(dominio);
                _ClienteRepository.Commit();


                return new InsertarActualizarClienteOutput() {   idcliente = dominio.idcliente };

            }
            catch (Exception ex)
            {
              //  _ValortablaRepository.Delete(dominio);
                //_ValortablaRepository.Commit();
                throw;
            }

        }
    }
}
