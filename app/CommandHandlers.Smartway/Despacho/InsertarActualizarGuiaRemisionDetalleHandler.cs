

using CommandContracts.Smartway.Despacho;
using CommandContracts.Smartway.Despacho.Output;
using CommandContracts.Smartway.Facturacion.Output;
using CommandHandlers.Common;
using Domain.Common.Contracts;
using Domain.Smartway.Despacho;
using System;
using System.Linq;
namespace CommandHandlers.Smartway
{
    public class InsertarActualizarGuiaRemisionDetalleHandler : ICommandHandler<InsertarActualizarGuiaRemisionDetalleCommand>
    {
        private readonly IRepository<GuiaRemisionDetalle> _GuiaRemisionRepository;


        public InsertarActualizarGuiaRemisionDetalleHandler(IRepository<GuiaRemisionDetalle> pGuiaRemisionRepository)
        {
            this._GuiaRemisionRepository = pGuiaRemisionRepository;
        }

        public CommandContracts.Common.CommandResult Handle(InsertarActualizarGuiaRemisionDetalleCommand command)
        {
            if (command == null) throw new ArgumentException("Tiene que ingresar una cliente");


           GuiaRemisionDetalle dominio = null;
           if (command.idguiadetalle.HasValue)
               dominio = _GuiaRemisionRepository.Get(x => x.idguiadetalle == command.idguiadetalle).LastOrDefault();
            else
               dominio = new GuiaRemisionDetalle();

               dominio.descripcion = command.descripcion;
               dominio.cantidad = command.cantidad;
               dominio.codigo = command.codigo;
               dominio.idguiaremision = command.idguiaremision;
               dominio.idordenservicio = command.idordenservicio;

            try
            {
                if (!command.idguiadetalle.HasValue)
                    _GuiaRemisionRepository.Add(dominio);
                _GuiaRemisionRepository.Commit();


                return new InsertarActualizarGuiaRemisionDetalleOutput() {      idguiadetalle = dominio.idguiadetalle };

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
