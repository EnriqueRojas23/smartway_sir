

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
    public class InsertarActualizarIncidenciaCotizacionHandler : ICommandHandler<InsertarActualizarIncidenciaCotizacionCommand>
    {
        private readonly IRepository<IncidenciaCotizacion> _IncidenciaCotizacionRepository;


        public InsertarActualizarIncidenciaCotizacionHandler(IRepository<IncidenciaCotizacion> pIncidenciaCotizacionRepository)
        {
            this._IncidenciaCotizacionRepository = pIncidenciaCotizacionRepository;
        }

        public CommandContracts.Common.CommandResult Handle(InsertarActualizarIncidenciaCotizacionCommand command)
        {
            if (command == null) throw new ArgumentException("Tiene que ingresar un comando");


            IncidenciaCotizacion dominio = null;
           if (command.idcotizacion.HasValue)
               dominio = _IncidenciaCotizacionRepository.Get(x => x.idcotizacion == command.idcotizacion).LastOrDefault();
            else
               dominio = new IncidenciaCotizacion();

            if (!command.idcotizacion.HasValue)
            {
                dominio.fechahoraregistro = command.fechahoraregistro;
                dominio.idusuarioregistro = command.idusuarioregistro;
            }
            dominio.igv = command.igv;
            dominio.repararotrolaboratorio = command.repararotrolaboratorio;
            dominio.subtotal = command.subtotal;
            dominio.total = command.total;
            dominio.delivery = command.delivery;
            dominio.idestado = command.idestado;
            dominio.idincidencia = command.idincidencia;
            dominio.idmoneda = command.idmoneda;
            dominio.idsucursalreparacion = command.idsucursalreparacion;
            dominio.iddirecciondelivery = command.iddirecciondelivery;
            

            try
            {
                if (!command.idcotizacion.HasValue)
                    _IncidenciaCotizacionRepository.Add(dominio);
                _IncidenciaCotizacionRepository.Commit();


                return new InsertarActualizarIncidenciaCotizacionOutput() {     idcotizacion = dominio.idcotizacion };

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
