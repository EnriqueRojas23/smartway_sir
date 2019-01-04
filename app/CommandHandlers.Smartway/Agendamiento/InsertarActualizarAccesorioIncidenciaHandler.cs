

using CommandContracts.Common;
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
    public class InsertarActualizarAccesorioIncidenciaHandler : ICommandHandler<InsertarActualizarAccesorioIncidenciaCommand>
    {
        private readonly IRepository<AccesorioIncidencia> _AccesorioIncidenciaRepository;


        public InsertarActualizarAccesorioIncidenciaHandler(IRepository<AccesorioIncidencia> pAccesorioIncidenciaRepository)
        {
            this._AccesorioIncidenciaRepository = pAccesorioIncidenciaRepository;
        }

        public CommandResult Handle(InsertarActualizarAccesorioIncidenciaCommand command)
        {
            if (command == null) throw new ArgumentException("Tiene que ingresar un comando");


            var datos_incidencia = ObtenerNuevoNumeroIncidencia();

           AccesorioIncidencia dominio = null;
           dominio = new AccesorioIncidencia();
           dominio.idincidencia = command.idincidencia;

            try
            {
                foreach (var item in command.idsaccesorios.Split(','))
                {

                     dominio.idaccesorio =Convert.ToInt32(item);
                    _AccesorioIncidenciaRepository.Add(dominio);
                    _AccesorioIncidenciaRepository.Commit();
                }
                return new InsertarActualizarIncidenciaOutput() {    idincidencia = dominio.idincidencia };

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
