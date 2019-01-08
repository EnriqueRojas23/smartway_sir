

using CommandContracts.Smartway.Mantenimiento;
using CommandContracts.Smartway.Mantenimiento.Output;
using CommandHandlers.Common;
using Domain.Common.Contracts;
using Domain.TYS.Seguimiento;
using System;
using System.Linq;
namespace CommandHandlers.TYS
{
    public class EliminarDiagnosticoxTipoProductoHandler : ICommandHandler<EliminarDiagnosticoxTipoProductoCommand>
    {
        private readonly IRepository<DiagnosticoxTipoProducto> _DiagnosticoxTipoProductoRepository;
        public EliminarDiagnosticoxTipoProductoHandler(IRepository<DiagnosticoxTipoProducto> pDiagnosticoxTipoProductoRepository)
        {
            this._DiagnosticoxTipoProductoRepository = pDiagnosticoxTipoProductoRepository;
        }
        public CommandContracts.Common.CommandResult Handle(EliminarDiagnosticoxTipoProductoCommand command)
        {
            if (command == null) throw new ArgumentException("Tiene que ingresar una cliente");
            DiagnosticoxTipoProducto dominio = null;
            dominio = _DiagnosticoxTipoProductoRepository.Get(x => x.iddiagnosticosmartway == command.iddiagnosticosmartway).LastOrDefault();

            if(dominio != null)
                _DiagnosticoxTipoProductoRepository.Delete(dominio);
            try
            {
                _DiagnosticoxTipoProductoRepository.Commit();
                return new InsertarActualizarDiagnosticoxTipoProductoOutput() {  iddiagnosticotipoproducto =   1 };
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
