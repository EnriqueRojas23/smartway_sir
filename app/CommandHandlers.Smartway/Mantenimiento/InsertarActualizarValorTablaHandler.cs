

using CommandContracts.Smartway.Mantenimiento;
using CommandContracts.Smartway.Mantenimiento.Output;
using CommandHandlers.Common;
using Domain.Common.Contracts;
using Domain.Smartway.Mantenimiento;
using System;
using System.Linq;
namespace CommandHandlers.Smartway
{
    public class InsertarActualizarValorTablaHandler : ICommandHandler<InsertarActualizarValorTablaCommand>
    {
        private readonly IRepository<Valortabla> _ValortablaRepository;


        public InsertarActualizarValorTablaHandler(IRepository<Valortabla> pValortablaRepository)
        {
            this._ValortablaRepository = pValortablaRepository;
        }

        public CommandContracts.Common.CommandResult Handle(InsertarActualizarValorTablaCommand command)
        {
            if (command == null) throw new ArgumentException("Tiene que ingresar una etapa");


           Valortabla  dominio = null;
            if (command.idvalortabla.HasValue)
                dominio = _ValortablaRepository.Get(x => x.idvalortabla == command.idvalortabla).LastOrDefault();
            else
                dominio = new Valortabla();
            if (!command.activo)
                dominio.activo = false;
            else
            {
                dominio.idmaestrotabla = command.idmaestrotabla;
                dominio.valor = command.valor;
                dominio.orden = command.orden;
                dominio.activo = true;
            }
            


            try
            {
                if (!command.idvalortabla.HasValue)
                    _ValortablaRepository.Add(dominio);
                _ValortablaRepository.Commit();


                return new InsertarActualizarValorTablaOutput() {  idvalortabla = dominio.idvalortabla };

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
