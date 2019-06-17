

using CommandContracts.Smartway.Agendamiento;
using CommandContracts.Smartway.Agendamiento.Output;
using CommandContracts.Smartway.Despacho.Output;
using CommandHandlers.Common;
using Domain.Common.Contracts;
using Domain.Smartway.Agendamiento;
using Domain.Smartway.Agendamiento.Exceptions;
using Domain.Smartway.Despacho;
using QueryContracts.Smartway.Agendamiento.Incidencias.Parameters;
using QueryContracts.Smartway.Agendamiento.Incidencias.Results;
using QueryHandlers.Smartway.Agendamiento.Incidencias;
using System;
using System.Linq;
namespace CommandHandlers.Smartway
{
    public class EliminarDetalleGuiaHandler : ICommandHandler<EliminarDetalleGuiaCommand>
    {
        private readonly IRepository<GuiaRemisionDetalle> _DetalleGuiaRepository;


        public EliminarDetalleGuiaHandler(IRepository<GuiaRemisionDetalle> pDetalleGuiaRepository)
        {
            this._DetalleGuiaRepository = pDetalleGuiaRepository;
        }

        public CommandContracts.Common.CommandResult Handle(EliminarDetalleGuiaCommand command)
        {
            if (command == null) throw new ArgumentException("Tiene que ingresar un comando");


            var dominio = _DetalleGuiaRepository.Get(x => x.idguiadetalle == command.idguiadetalle).ToList();


            try
            {
                foreach (var item in dominio)
                {
                    _DetalleGuiaRepository.Delete(item);
                    _DetalleGuiaRepository.Commit();
                }
     


                return new EliminarDetalleGuiaOutput() {      idguiadetalle =  command.idguiadetalle };

            }
            catch (Exception ex)
            {
                //_ValortablaRepository.Delete(dominio);
                //_ValortablaRepository.Commit();
                throw;
            }

        }
       
    }
}
