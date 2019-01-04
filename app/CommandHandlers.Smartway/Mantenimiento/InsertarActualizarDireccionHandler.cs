

using CommandContracts.Smartway.Mantenimiento;
using CommandContracts.Smartway.Mantenimiento.Output;
using CommandHandlers.Common;
using Domain.Common.Contracts;
using Domain.Smartway.Mantenimiento;
using System;
using System.Linq;
namespace CommandHandlers.Smartway
{
    public class InsertarActualizarDireccionHandler : ICommandHandler<InsertarActualizarDireccionCommand>
    {
        private readonly IRepository<Direccion> _DireccionRepository;


        public InsertarActualizarDireccionHandler(IRepository<Direccion> pDireccionRepository)
        {
            this._DireccionRepository = pDireccionRepository;
        }

        public CommandContracts.Common.CommandResult Handle(InsertarActualizarDireccionCommand command)
        {
            if (command == null) throw new ArgumentException("Tiene que ingresar una cliente");


            Direccion dominio = null;
           if (command.iddireccion.HasValue)
               dominio = _DireccionRepository.Get(x => x.iddireccion == command.iddireccion).LastOrDefault();
            else
               dominio = new Direccion();


            if (command.__tipooperacion == 2)
            {
                dominio.activo = command.activo;
            }
            else
            {
                dominio.direccion = command.direccion;
                dominio.iddistrito = command.iddistrito;
                dominio.principal = command.principal;
                dominio.idcliente = command.idcliente;
                dominio.codigo = command.codigo;
                dominio.activo = command.activo;
            }



            try
            {
                if (!command.iddireccion.HasValue)
                    _DireccionRepository.Add(dominio);
                _DireccionRepository.Commit();


                return new InsertarActualizarDireccionOutput() {    iddireccion = dominio.iddireccion};

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
