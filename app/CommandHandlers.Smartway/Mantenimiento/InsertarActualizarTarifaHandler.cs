

using CommandContracts.Smartway.Mantenimiento;
using CommandContracts.Smartway.Mantenimiento.Output;
using CommandHandlers.Common;
using Domain.Common.Contracts;
using Domain.TYS.Seguimiento;
using System;
using System.Linq;
namespace CommandHandlers.TYS
{
    public class InsertarActualizarTarifaHandler : ICommandHandler<InsertarActualizarTarifaCommand>
    {
        private readonly IRepository<Tarifa> _TarifaRepository;


        public InsertarActualizarTarifaHandler(IRepository<Tarifa> pTarifaRepository)
        {
            this._TarifaRepository = pTarifaRepository;
        }

        public CommandContracts.Common.CommandResult Handle(InsertarActualizarTarifaCommand command)
        {
            if (command == null) throw new ArgumentException("Tiene que ingresar una cliente");

            Tarifa dominio = null;
           if (command.idtarifa.HasValue)
               dominio = _TarifaRepository.Get(x => x.idtarifa == command.idtarifa).LastOrDefault();
            else
               dominio = new Tarifa();

            if (command.__tipooperacion == 2)
            {
                dominio.activo = command.activo;

            }
            else
            {

                if (!command.idtarifa.HasValue)
                {
                    dominio.fechahoraregistro = command.fechahoraregistro;
                    dominio.idusuarioregistro = command.idusuarioregistro;
                }
                dominio.costo = command.costo;
                dominio.idmoneda = command.idmoneda;
                dominio.idpartner = command.idpartner;
                dominio.idtipoproducto = command.idtipoproducto;
                dominio.idtipotarifa = command.idtipotarifa;
                dominio.revision = command.revision;
                dominio.garantia = command.garantia;
                dominio.idnivelreparacion = command.idnivelreparacion;
                dominio.activo = command.activo;
            }

            try
            {
                if (!command.idtarifa.HasValue)
                    _TarifaRepository.Add(dominio);
                _TarifaRepository.Commit();


                return new InsertarActualizarTarifaOutput() {   idtarifa = dominio.idtarifa };

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
