

using CommandContracts.Smartway.Despacho;
using CommandContracts.Smartway.Despacho.Output;
using CommandHandlers.Common;
using Domain.Common.Contracts;
using Domain.Smartway.Despacho;
using System;
using System.Linq;
namespace CommandHandlers.Smartway
{
    public class InsertarOrdenSalidaHandler : ICommandHandler<InsertarOrdenSalidaCommand>
    {
        private readonly IRepository<OrdenSalida> _OrdenSalidaRepository;


        public InsertarOrdenSalidaHandler(IRepository<OrdenSalida> pOrdenSalidaRepository)
        {
            this._OrdenSalidaRepository = pOrdenSalidaRepository;
        }

        public CommandContracts.Common.CommandResult Handle(InsertarOrdenSalidaCommand command)
        {
            if (command == null) throw new ArgumentException("Tiene que ingresar una cliente");


            OrdenSalida dominio = null;
           if (command.iddocumentosalida.HasValue)
               dominio = _OrdenSalidaRepository.Get(x => x.iddocumentosalida == command.iddocumentosalida).LastOrDefault();
            else
               dominio = new OrdenSalida();

            dominio.activo = command.activo;
            dominio.fechahoraregistro = command.fechahoraregistro;
            dominio.idcliente = command.idcliente;
            dominio.idtiposalida = command.idtiposalida;
            dominio.idusuarioregistro = command.idusuarioregistro;
            dominio.numerodocumento = "TEMP";


            dominio.fechasalida = command.fechasalida; 
            

            try
            {
                if (!command.iddocumentosalida.HasValue)
                    _OrdenSalidaRepository.Add(dominio);
                _OrdenSalidaRepository.Commit();

                dominio.numerodocumento =  dominio.iddocumentosalida.ToString().PadLeft(6, '0');
                _OrdenSalidaRepository.Commit();

                return new InsertarOrdenSalidaOutput() {  iddocumentosalida = dominio.iddocumentosalida };

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
