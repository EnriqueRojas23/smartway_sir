

using CommandContracts.Smartway.Agendamiento;
using CommandContracts.Smartway.Agendamiento.Output;
using CommandHandlers.Common;
using Domain.Common.Contracts;
using Domain.Smartway.Agendamiento;
using Domain.Smartway.Agendamiento.Exceptions;
using QueryContracts.Smartway.Agendamiento.Incidencias.Parameters;
using QueryContracts.Smartway.Agendamiento.Incidencias.Results;
using QueryHandlers.Smartway.Agendamiento.Incidencias;
using System;
using System.Linq;
namespace CommandHandlers.Smartway
{
    public class InsertarActualizarIncidenciaCotizacionDetalleHandler : ICommandHandler<InsertarActualizarIncidenciaCotizacionDetalleCommand>
    {
        private readonly IRepository<IncidenciaCotizacionDetalle> _IncidenciaCotizacionDetalleRepository;


        public InsertarActualizarIncidenciaCotizacionDetalleHandler(IRepository<IncidenciaCotizacionDetalle> pIncidenciaCotizacionDetalleRepository)
        {
            this._IncidenciaCotizacionDetalleRepository = pIncidenciaCotizacionDetalleRepository;
        }

        public CommandContracts.Common.CommandResult Handle(InsertarActualizarIncidenciaCotizacionDetalleCommand command)
        {
            if (command == null) throw new ArgumentException("Tiene que ingresar un comando");


            IncidenciaCotizacionDetalle dominio = null;
           if (command.idcotizaciondetalle.HasValue)
               dominio = _IncidenciaCotizacionDetalleRepository.Get(x => x.idcotizaciondetalle == command.idcotizaciondetalle).LastOrDefault();
            else
               dominio = new IncidenciaCotizacionDetalle();

           
            dominio.costo = command.costo;
            dominio.descripcion = command.descripcion;
            dominio.idcotizacion = command.idcotizacion;
            dominio.iddiagnostico = command.iddiagnostico;
            dominio.idreparacion = command.idreparacion;
            dominio.idrepuesto = command.idrepuesto;

            try
            {
                if (!command.idcotizaciondetalle.HasValue)
                    _IncidenciaCotizacionDetalleRepository.Add(dominio);
                _IncidenciaCotizacionDetalleRepository.Commit();


                return new InsertarActualizarIncidenciaCotizacionDetalleOutput() {      idcotizaciondetalle = dominio.idcotizaciondetalle };

            }
            catch (Exception ex)
            {
                //_ValortablaRepository.Delete(dominio);
                //_ValortablaRepository.Commit();
                throw;
            }

        }
        private static ObtenerNumeroIncidenciaResult ObtenerNuevoNumeroIncidencia()
        {
            var query = new ObtenerNumeroIncidenciaQuery();
            var queryresult = query.Handle(new ObtenerNumeroIncidenciaParameter() { });
            if (queryresult == null) throw new IncidenciaException("No se pudo generar el numero de incidencia.");
            return (ObtenerNumeroIncidenciaResult)queryresult;
        }
    }
}
