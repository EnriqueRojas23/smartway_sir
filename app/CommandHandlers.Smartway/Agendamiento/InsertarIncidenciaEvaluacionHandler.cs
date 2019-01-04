

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
    public class InsertarIncidenciaEvaluacionHandler : ICommandHandler<InsertarIncidenciaEvaluacionCommand>
    {
        private readonly IRepository<IncidenciaEvaluacion> _IncidenciaEvaluacionRepository;


        public InsertarIncidenciaEvaluacionHandler(IRepository<IncidenciaEvaluacion> pIncidenciaEvaluacionRepository)
        {
            this._IncidenciaEvaluacionRepository = pIncidenciaEvaluacionRepository;
        }

        public CommandContracts.Common.CommandResult Handle(InsertarIncidenciaEvaluacionCommand command)
        {
            if (command == null) throw new ArgumentException("Tiene que ingresar un comando");



            IncidenciaEvaluacion dominio = null;
           if (command.idevaluaciongarantia.HasValue)
               dominio = _IncidenciaEvaluacionRepository.Get(x => x.idevaluaciongarantia == command.idevaluaciongarantia).LastOrDefault();
            else
               dominio = new IncidenciaEvaluacion();

            dominio.fechahoraregistro = command.fechahoraregistro;
            dominio.idusuarioregistro = command.idusuarioregistro;
            dominio.idcondicion = command.idcondicion;
            dominio.idincidencia = command.idincidencia;
            dominio.observacion = command.observacion;
            dominio.valor = command.valor;

            try
            {
                if (!command.idevaluaciongarantia.HasValue)
                    _IncidenciaEvaluacionRepository.Add(dominio);
                _IncidenciaEvaluacionRepository.Commit();


                return new InsertarIncidenciaEvaluacionOutput() {     idevaluaciongarantia = dominio.idevaluaciongarantia };

            }
            catch (Exception ex)
            {
                //_ValortablaRepository.Delete(dominio);
                //_ValortablaRepository.Commit();
                throw;
            }

        }
        //private static ObtenerNumeroIncidenciaResult ObtenerNuevoNumeroIncidencia()
        //{
        //    var query = new ObtenerNumeroIncidenciaQuery();
        //    var queryresult = query.Handle(new ObtenerNumeroIncidenciaParameter() { });
        //    if (queryresult == null) throw new IncidenciaException("No se pudo generar el numero de incidencia.");
        //    return (ObtenerNumeroIncidenciaResult)queryresult;
        //}
    }
}
