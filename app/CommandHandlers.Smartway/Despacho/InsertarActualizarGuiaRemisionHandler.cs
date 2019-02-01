

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
    public class InsertarActualizarGuiaRemisionHandler : ICommandHandler<InsertarActualizarGuiaRemisionCommand>
    {
        private readonly IRepository<GuiaRemision> _GuiaRemisionRepository;


        public InsertarActualizarGuiaRemisionHandler(IRepository<GuiaRemision> pGuiaRemisionRepository)
        {
            this._GuiaRemisionRepository = pGuiaRemisionRepository;
        }

        public CommandContracts.Common.CommandResult Handle(InsertarActualizarGuiaRemisionCommand command)
        {
            if (command == null) throw new ArgumentException("Tiene que ingresar una cliente");


            GuiaRemision dominio = null;
           if (command.idguiaremision.HasValue)
               dominio = _GuiaRemisionRepository.Get(x => x.idguiaremision == command.idguiaremision).LastOrDefault();
            else
               dominio = new GuiaRemision();

            switch (command.__tipooperacion)
            {
                case 1:
                    dominio.descripcion = command.descripcion;
                    dominio.documentoreferencia = command.documentoreferencia;
                    dominio.fechahoraregistro = DateTime.Now;
                    dominio.idestado = command.idestado;
            
                    dominio.idusuariorecojo = command.idusuariorecojo;
                    dominio.idusuarioregistro = command.idusuarioregistro;
                    dominio.numeroguia = command.numeroguia;
                    dominio.idcliente = command.idcliente;
                    dominio.fechaguiaremision = command.fechaguiaremision;
                    dominio.direcciondestino = command.direcciondestino;
                    dominio.direccionorigen = command.direccionorigen;
                    dominio.iddestinatario = command.iddestinatario;
                    dominio.idtransportista = command.idtransportista;
                    break;
                case 2:
                    dominio.idestado = command.idestado;
                    break;
              
            }
               


            try
            {
                if (!command.idguiaremision.HasValue)
                    _GuiaRemisionRepository.Add(dominio);
                _GuiaRemisionRepository.Commit();


                return new InsertarActualizarGuiaRemisionOutput() {     idguiaremision = dominio.idguiaremision };

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
