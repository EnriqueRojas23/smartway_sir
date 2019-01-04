

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
    public class InsertarActualizarOrdenTrabajoHandler : ICommandHandler<InsertarActualizarOrdenTrabajoCommand>
    {
        private readonly IRepository<OrdenTrabajo> _OrdenTrabajoRepository;


        public InsertarActualizarOrdenTrabajoHandler(IRepository<OrdenTrabajo> pOrdenTrabajoRepository)
        {
            this._OrdenTrabajoRepository = pOrdenTrabajoRepository;
        }

        public CommandResult Handle(InsertarActualizarOrdenTrabajoCommand command)
        {
            if (command == null) throw new ArgumentException("Tiene que ingresar una cliente");


            OrdenTrabajo dominio = null;
           if (command.idordentrabajo.HasValue)
               dominio = _OrdenTrabajoRepository.Get(x => x.idordentrabajo == command.idordentrabajo).LastOrDefault();
            else
               dominio = new OrdenTrabajo();

            switch (command.__tipooperacion)
            {
                case 1: //Insertar
                    dominio.fechahoraregistro = command.fechahoraregistro;
                    dominio.idtecnico = command.idtecnico;
                    dominio.idestado = command.idestado;
                    dominio.idusuarioregistro = command.idusuarioregistro;
                    dominio.bounce = command.bounce;
                    dominio.detenida = command.detenida;
                    dominio.incidencia = command.incidencia;
                    dominio.numeroordentrabajo = "Sin número";
                    dominio.idordenserviciotecnico = command.idordenserviciotecnico;
                    break;
                case 2: // Actualizar Estado
                    dominio.idestado = command.idestado;
                    dominio.bounce = command.bounce;
                    dominio.descripcion = command.descripcion;
                    break;
                default:
                    break;
            }
               


            try
            {
                if (!command.idordentrabajo.HasValue)
                    _OrdenTrabajoRepository.Add(dominio);
                _OrdenTrabajoRepository.Commit();


                return new InsertarActualizarOrdenTrabajoOutput() {     idordentrabajo = dominio.idordentrabajo };

            }
            catch (Exception ex)
            {
              //  _ValortablaRepository.Delete(dominio);
                //_ValortablaRepository.Commit();
                throw;
            }

        }
        private static ObtenerUltimaOrdenTrabajoResult obtenerUltimoNumero()
        {
            var query = new ObtenerUltimaOrdenTrabajoQuery();
            var queryresult = query.Handle(new ObtenerUltimaOrdenTrabajoParameter() { });
            //if (queryresult == null) throw new IncidenciaException("No se pudo generar el numero de incidencia.");
            return (ObtenerUltimaOrdenTrabajoResult)queryresult;
        }
    }
}
