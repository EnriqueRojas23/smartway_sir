

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
    public class EliminarRepuestoxReparacionHandler : ICommandHandler<EliminarRepuestoxReparacionCommand>
    {
        private readonly IRepository<RepuestoxReparacion> _RepuestoxReparacionRepository;


        public EliminarRepuestoxReparacionHandler(IRepository<RepuestoxReparacion> pRepuestoxReparacionRepository)
        {
            this._RepuestoxReparacionRepository = pRepuestoxReparacionRepository;
        }

        public CommandContracts.Common.CommandResult Handle(EliminarRepuestoxReparacionCommand command)
        {
            if (command == null) throw new ArgumentException("Tiene que ingresar una elemento");


            var dominio = _RepuestoxReparacionRepository.Get(x => x.idrepuesto.Equals(command.idrepuesto)).ToList();

          

            try
            {

                foreach (var item in dominio)
                {
                    _RepuestoxReparacionRepository.Delete(item);
                    _RepuestoxReparacionRepository.Commit();

                }
              


                return new InsertarActualizarRepuestoxReparacionOutput() {   idrepuestoreparacion =command.idrepuesto };

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
