

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
    public class EliminarIncidenciaEvaluacionHandler : ICommandHandler<EliminarIncidenciaEvaluacionCommand>
    {
        private readonly IRepository<IncidenciaEvaluacion> _IncidenciaEvaluacionRepository;


        public EliminarIncidenciaEvaluacionHandler(IRepository<IncidenciaEvaluacion> pIncidenciaEvaluacionRepository)
        {
            this._IncidenciaEvaluacionRepository = pIncidenciaEvaluacionRepository;
        }

        public CommandContracts.Common.CommandResult Handle(EliminarIncidenciaEvaluacionCommand command)
        {
            if (command == null) throw new ArgumentException("Tiene que ingresar un comando");


            var dominio = _IncidenciaEvaluacionRepository.Get(x => x.idincidencia == command.idincidencia).ToList();


            try
            {
                foreach (var item in dominio)
                {
                    _IncidenciaEvaluacionRepository.Delete(item);
                    _IncidenciaEvaluacionRepository.Commit();
                }
     


                return new InsertarIncidenciaEvaluacionOutput() {     idevaluaciongarantia = 1 };

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
