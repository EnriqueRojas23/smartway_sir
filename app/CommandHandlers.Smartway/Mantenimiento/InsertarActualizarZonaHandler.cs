

using CommandContracts.Smartway.Mantenimiento;
using CommandContracts.Smartway.Mantenimiento.Output;
using CommandHandlers.Common;
using Domain.Common.Contracts;
using Domain.Smartway.Mantenimiento;
using System;
using System.Linq;
namespace CommandHandlers.Smartway
{
    public class InsertarActualizarZonaHandler : ICommandHandler<InsertarActualizarZonaCommand>
    {
        private readonly IRepository<Zona> _ZonaRepository;


        public InsertarActualizarZonaHandler(IRepository<Zona> pZonaRepository)
        {
            this._ZonaRepository = pZonaRepository;
        }

        public CommandContracts.Common.CommandResult Handle(InsertarActualizarZonaCommand command)
        {
            if (command == null) throw new ArgumentException("Tiene que ingresar una cliente");

           Zona  dominio = null;
           if (command.idzona.HasValue)
               dominio = _ZonaRepository.Get(x => x.idzona == command.idzona).LastOrDefault();
            else
               dominio = new Zona();

           dominio.nombre = command.nombre;
           dominio.activo = command.activo;

            try
            {
                if (!command.idzona.HasValue)
                    _ZonaRepository.Add(dominio);
                _ZonaRepository.Commit();


                return new InsertarActualizarZonaOutput() { idzona = dominio.idzona };

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
