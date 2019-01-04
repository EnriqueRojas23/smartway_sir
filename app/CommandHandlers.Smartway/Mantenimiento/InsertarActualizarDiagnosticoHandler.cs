

using CommandContracts.Smartway.Mantenimiento;
using CommandContracts.Smartway.Mantenimiento.Output;
using CommandHandlers.Common;
using Domain.Common.Contracts;
using Domain.TYS.Seguimiento;
using System;
using System.Linq;
namespace CommandHandlers.TYS
{
    public class InsertarActualizarDiagnosticoHandler : ICommandHandler<InsertarActualizarDiagnosticoCommand>
    {
        private readonly IRepository<Diagnostico> _DiagnosticoRepository;


        public InsertarActualizarDiagnosticoHandler(IRepository<Diagnostico> pDiagnosticoRepository)
        {
            this._DiagnosticoRepository = pDiagnosticoRepository;
        }

        public CommandContracts.Common.CommandResult Handle(InsertarActualizarDiagnosticoCommand command)
        {
            if (command == null) throw new ArgumentException("Tiene que ingresar una cliente");

            Diagnostico dominio = null;
           if (command.iddiagnostico.HasValue)
               dominio = _DiagnosticoRepository.Get(x => x.iddiagnosticosmartway == command.iddiagnostico).LastOrDefault();
            else
               dominio = new    Diagnostico();

            dominio.codigosmartway = command.codigosmartway;
            dominio.descripcion = command.descripcion;
            dominio.idcategoriareparacion= command.idcategoriareparacion;
            dominio.activo = true;
            dominio.adjuntarimagen = true;
            dominio.garantia = true;
                
            

            try
            {
                if (!command.iddiagnostico.HasValue)
                    _DiagnosticoRepository.Add(dominio);
                _DiagnosticoRepository.Commit();


                return new InsertarActualizarDiagnosticoOutput() {   iddiagnostico = dominio.iddiagnosticosmartway };

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
