

using CommandContracts.Smartway.Mantenimiento;
using CommandContracts.Smartway.Mantenimiento.Output;
using CommandHandlers.Common;
using Domain.Common.Contracts;
using Domain.TYS.Seguimiento;
using System;
using System.Linq;
namespace CommandHandlers.TYS
{
    public class InsertarActualizarDiagnosticoxTipoProductoHandler : ICommandHandler<InsertarActualizarDiagnosticoxTipoProductoCommand>
    {
        private readonly IRepository<DiagnosticoxTipoProducto> _DiagnosticoxTipoProductoRepository;


        public InsertarActualizarDiagnosticoxTipoProductoHandler(IRepository<DiagnosticoxTipoProducto> pDiagnosticoxTipoProductoRepository)
        {
            this._DiagnosticoxTipoProductoRepository = pDiagnosticoxTipoProductoRepository;
        }

        public CommandContracts.Common.CommandResult Handle(InsertarActualizarDiagnosticoxTipoProductoCommand command)
        {
            if (command == null) throw new ArgumentException("Tiene que ingresar una cliente");

            DiagnosticoxTipoProducto dominio = null;
           if (command.iddiagnosticotipoproducto.HasValue)
               dominio = _DiagnosticoxTipoProductoRepository.Get(x => x.iddiagnosticotipoproducto == command.iddiagnosticotipoproducto).LastOrDefault();
            else
               dominio = new DiagnosticoxTipoProducto();

            dominio.idtipoproducto = command.idtipoproducto;
            dominio.iddiagnosticosmartway = command.iddiagnosticosmartway;
            

            try
            {
                if (!command.iddiagnosticotipoproducto.HasValue)
                    _DiagnosticoxTipoProductoRepository.Add(dominio);
                _DiagnosticoxTipoProductoRepository.Commit();


                return new InsertarActualizarDiagnosticoxTipoProductoOutput() {    iddiagnosticotipoproducto = dominio.iddiagnosticotipoproducto };

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
