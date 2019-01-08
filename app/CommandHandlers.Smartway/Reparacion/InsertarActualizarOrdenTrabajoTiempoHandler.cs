

using CommandContracts.Common;
using CommandContracts.Smartway.Mantenimiento.Output;
using CommandContracts.Smartway.Reparacion;
using CommandHandlers.Common;
using Domain.Common.Contracts;
using Domain.Smartway.Despacho;
using Domain.Smartway.Reparacion;
using QueryContracts.Smartway.Reparacion.Parameters;
using QueryContracts.Smartway.Reparacion.Results;
using QueryHandlers.Smartway.Reparacion.OrdenTrabajo;
using System;
using System.Linq;
namespace CommandHandlers.Smartway.Reparacion
{
    public class InsertarActualizarOrdenTrabajoTiempoHandler : ICommandHandler<InsertarActualizarOrdenTrabajoTiempoCommand>
    {
        private readonly IRepository<OrdenTrabajoTiempo> _OrdenTrabajoTiempoRepository;


        public InsertarActualizarOrdenTrabajoTiempoHandler(IRepository<OrdenTrabajoTiempo> pOrdenTrabajoTiempoRepository)
        {
            this._OrdenTrabajoTiempoRepository = pOrdenTrabajoTiempoRepository;
        }

        public CommandResult Handle(InsertarActualizarOrdenTrabajoTiempoCommand command)
        {

            OrdenTrabajoTiempo dominio = null;
           if (command.idordentrabajotiempo.HasValue)
               dominio = _OrdenTrabajoTiempoRepository.Get(x => x.idordentrabajotiempo == command.idordentrabajotiempo).LastOrDefault();
            else
               dominio = new OrdenTrabajoTiempo();

            switch (command.__tipoperacion)
            {
                case 1: // inicio
                    dominio.fechahorainicio = command.fechahorainicio;
                    dominio.idordentrabajo = command.idordentrabajo;
                    dominio.idusuario = command.idusuario;
                    dominio.iteracion = command.iteracion;
                    break;
                case 2: // Fin
                    dominio.fechahorafin = command.fechahorafin;
                    break;
                default:
                    break;
            }
            
            try
            {
                if (!command.idordentrabajotiempo.HasValue)
                    _OrdenTrabajoTiempoRepository.Add(dominio);
                _OrdenTrabajoTiempoRepository.Commit();


                return new InsertarActualizarOrdenTrabajoTiempoOutput() {      idordentrabajotiempo = dominio.idordentrabajotiempo };

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
