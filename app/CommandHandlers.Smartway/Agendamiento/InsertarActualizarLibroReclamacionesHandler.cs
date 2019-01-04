

using CommandContracts.Smartway.Agendamiento;
using CommandContracts.Smartway.Agendamiento.Output;
using CommandHandlers.Common;
using Domain.Common.Contracts;
using Domain.Smartway.Agendamiento;
using System;
using System.Linq;
namespace CommandHandlers.Smartway
{
    public class InsertarActualizarLibroReclamacionesHandler : ICommandHandler<InsertarActualizarLibroReclamacionesCommand>
    {
        private readonly IRepository<LibroReclamaciones> _LibroReclamacionesRepository;
        public InsertarActualizarLibroReclamacionesHandler(IRepository<LibroReclamaciones> pLibroReclamacionesRepository)
        {
            _LibroReclamacionesRepository = pLibroReclamacionesRepository;
        }

        public CommandContracts.Common.CommandResult Handle(InsertarActualizarLibroReclamacionesCommand command)
        {
            if (command == null) throw new ArgumentException("Tiene que ingresar un comando");


            LibroReclamaciones dominio = null;
           if (command.idreclamo.HasValue)
               dominio = _LibroReclamacionesRepository.Get(x => x.idreclamo == command.idreclamo).LastOrDefault();
            else
               dominio = new LibroReclamaciones();

            dominio.numeroreclamacion = command.numeroreclamacion;
            dominio.idcondicionreclamo = command.idcondicionreclamo;
            dominio.idestado = command.idestado;
            dominio.idincidencia = command.idincidencia;


            try
            {
                if (!command.idreclamo.HasValue)
                    _LibroReclamacionesRepository.Add(dominio);
                _LibroReclamacionesRepository.Commit();


                return new InsertarActualizarLibroReclamacionesOutput() {  idreclamo = dominio.idreclamo };

            }
            catch (Exception ex)
            {
                //_ValortablaRepository.Delete(dominio);
                //_ValortablaRepository.Commit();
                throw;
            }

        }
    }
}
