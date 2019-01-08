

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
    public class InsertarActualizarOrdenTrabajoDetalleHandler : ICommandHandler<InsertarActualizarOrdenTrabajoDetalleCommand>
    {
        private readonly IRepository<OrdenTrabajoDetalle> _OrdenTrabajoDetalleRepository;


        public InsertarActualizarOrdenTrabajoDetalleHandler(IRepository<OrdenTrabajoDetalle> pOrdenTrabajoDetalleRepository)
        {
            this._OrdenTrabajoDetalleRepository = pOrdenTrabajoDetalleRepository;
        }

        public CommandResult Handle(InsertarActualizarOrdenTrabajoDetalleCommand command)
        {
            if (command == null) throw new ArgumentException("Tiene que ingresar una cliente");


            OrdenTrabajoDetalle dominio = null;
           if (command.idordentrabajodetalle.HasValue)
               dominio = _OrdenTrabajoDetalleRepository.Get(x => x.idordentrabajodetalle == command.idordentrabajodetalle).LastOrDefault();
            else
               dominio = new OrdenTrabajoDetalle();


            OrdenTrabajoDetalle dominio_servicio = null;
            if (command.idordentrabajodetalle.HasValue)
                dominio_servicio = _OrdenTrabajoDetalleRepository.Get(x => x.idservicioasociado == command.idordentrabajodetalle).LastOrDefault();



            switch (command.__idoperacion)
            {   
                case 1:
                    dominio.activo = command.activo;
                    dominio.costo = command.costo;
                    dominio.descripcion = command.descripcion;
                    dominio.iddiagnostico = command.iddiagnostico;
                    dominio.idordentrabajo = command.idordentrabajo;
                    dominio.idreparacion = command.idreparacion;
                    dominio.idrepuesto = command.idrepuesto;
                    dominio.servicio = command.servicio;
                    dominio.idservicioasociado = command.idservicioasociado;
                    dominio.idinventario = command.idinventario;
                    break;
                case 2:
                    dominio.activo = command.activo;
                    if (dominio_servicio != null)
                     dominio_servicio.activo = command.activo;

                    break;
                default:
                    break;
            }

           
            
               


            try
            {
                if (!command.idordentrabajodetalle.HasValue)
                    _OrdenTrabajoDetalleRepository.Add(dominio);
                _OrdenTrabajoDetalleRepository.Commit();


                return new InsertarActualizarOrdenTrabajoDetalleOutput() {      idordentrabajodetalle = dominio.idordentrabajodetalle };

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
