

using CommandContracts.Smartway.Despacho;
using CommandContracts.Smartway.Despacho.Output;
using CommandHandlers.Common;
using Domain.Common.Contracts;
using Domain.Smartway.Despacho;
using System;
using System.Linq;
namespace CommandHandlers.Smartway
{
    public class InsertarActualizarProgramacionDetalleHandler : ICommandHandler<InsertarActualizarProgramacionDetalleCommand>
    {
        private readonly IRepository<ProgramacionDetalle> _ProgramacionDetalleRepository;


        public InsertarActualizarProgramacionDetalleHandler(IRepository<ProgramacionDetalle> pProgramacionDetalleRepository)
        {
            this._ProgramacionDetalleRepository = pProgramacionDetalleRepository;
        }

        public CommandContracts.Common.CommandResult Handle(InsertarActualizarProgramacionDetalleCommand command)
        {
            if (command == null) throw new ArgumentException("Tiene que ingresar una cliente");


            ProgramacionDetalle dominio = null;
           if (command.idprogramaciondetalle.HasValue)
               dominio = _ProgramacionDetalleRepository.Get(x => x.idprogramaciondetalle == command.idprogramaciondetalle).LastOrDefault();
            else
               dominio = new ProgramacionDetalle();

                dominio.idprogramacion = command.idprogramacion;
                dominio.idguia = command.idguia;


            try
            {
                if (!command.idprogramaciondetalle.HasValue)
                    _ProgramacionDetalleRepository.Add(dominio);
                _ProgramacionDetalleRepository.Commit();


                return new InsertarActualizarProgramacionDetalleOutput() {     idprogramaciondetalle = dominio.idprogramaciondetalle };

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
