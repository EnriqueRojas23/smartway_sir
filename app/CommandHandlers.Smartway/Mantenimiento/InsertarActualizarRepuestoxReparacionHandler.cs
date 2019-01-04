

using CommandContracts.Smartway.Mantenimiento;
using CommandContracts.Smartway.Mantenimiento.Output;
using CommandHandlers.Common;
using Domain.Common.Contracts;
using Domain.Smartway.Mantenimiento;
using Domain.TYS.Seguimiento;
using System;
using System.Linq;
namespace CommandHandlers.TYS
{
    public class InsertarActualizarRepuestoxReparacionHandler : ICommandHandler<InsertarActualizarRepuestoxReparacionCommand>
    {
        private readonly IRepository<RepuestoxReparacion> _RepuestoxReparacionRepository;


        public InsertarActualizarRepuestoxReparacionHandler(IRepository<RepuestoxReparacion> pRepuestoxReparacionRepository)
        {
            this._RepuestoxReparacionRepository = pRepuestoxReparacionRepository;
        }

        public CommandContracts.Common.CommandResult Handle(InsertarActualizarRepuestoxReparacionCommand command)
        {
            if (command == null) throw new ArgumentException("Tiene que ingresar una cliente");

            RepuestoxReparacion dominio = null;
            if (command.idrepuestoreparacion.HasValue)
                dominio = _RepuestoxReparacionRepository.Get(x => x.idrepuestoreparacion == command.idrepuestoreparacion).LastOrDefault();
            else
                dominio = new RepuestoxReparacion();

            dominio.idreparacion = command.idreparacion;
            dominio.idrepuesto = command.idrepuesto;

            try
            {
                if (!command.idrepuestoreparacion.HasValue)
                    _RepuestoxReparacionRepository.Add(dominio);
                _RepuestoxReparacionRepository.Commit();


                return new InsertarActualizarRepuestoxReparacionOutput() {   idrepuestoreparacion = dominio.idrepuestoreparacion };

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
