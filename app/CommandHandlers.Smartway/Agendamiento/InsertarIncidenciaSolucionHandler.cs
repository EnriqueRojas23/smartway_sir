

using CommandContracts.Smartway.Agendamiento;
using CommandContracts.Smartway.Agendamiento.Output;
using CommandHandlers.Common;
using Domain.Common.Contracts;
using Domain.Smartway.Agendamiento;
using System;
using System.Linq;
namespace CommandHandlers.Smartway
{
    public class InsertarIncidenciaSolucionHandler : ICommandHandler<InsertarIncidenciaSolucionCommand>
    {
        private readonly IRepository<IncidenciaSolucion> _IncidenciaSolucionRepository;


        public InsertarIncidenciaSolucionHandler(IRepository<IncidenciaSolucion> pIncidenciaSolucionRepository)
        {
            this._IncidenciaSolucionRepository = pIncidenciaSolucionRepository;
        }

        public CommandContracts.Common.CommandResult Handle(InsertarIncidenciaSolucionCommand command)
        {
            if (command == null) throw new ArgumentException("Tiene que ingresar un comando");



            IncidenciaSolucion dominio = null;
           if (command.idincidenciasolucion.HasValue)
               dominio = _IncidenciaSolucionRepository.Get(x => x.idincidenciasolucion == command.idincidenciasolucion).LastOrDefault();
            else
               dominio = new IncidenciaSolucion();

            dominio.fechahoraregistro = command.fechahoraregistro;
            dominio.idusuarioregistro = command.idusuarioregistro;
            dominio.clientesatisfecho = command.clientesatisfecho;
            dominio.idestado = command.idestado;
            dominio.idincidencia = command.idincidencia;
            dominio.idpropuesta = command.idpropuesta;
            dominio.observacion = command.observacion;
            


            try
            {
                if (!command.idincidenciasolucion.HasValue)
                    _IncidenciaSolucionRepository.Add(dominio);
                _IncidenciaSolucionRepository.Commit();


                return new InsertarIncidenciaSolucionOutput() {     idincidenciasolucion = dominio.idincidenciasolucion };

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
