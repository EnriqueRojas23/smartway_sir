

using CommandContracts.Smartway.Facturacion;
using CommandContracts.Smartway.Facturacion.Output;
using CommandHandlers.Common;
using Domain.Common.Contracts;
using Domain.Smartway.Facturacion;
using System;
using System.Linq;
namespace CommandHandlers.Smartway
{
    public class InsertarActualizarDetalleComprobanteClienteHandler : ICommandHandler<InsertarActualizarDetalleComprobanteClienteCommand>
    {
        private readonly IRepository<DetalleComprobanteCliente> _DetalleComprobanteClienteRepository;


        public InsertarActualizarDetalleComprobanteClienteHandler(IRepository<DetalleComprobanteCliente> pDetalleComprobanteClienteRepository)
        {
            this._DetalleComprobanteClienteRepository = pDetalleComprobanteClienteRepository;
        }

        public CommandContracts.Common.CommandResult Handle(InsertarActualizarDetalleComprobanteClienteCommand command)
        {
            if (command == null) throw new ArgumentException("Tiene que ingresar un comando");


            DetalleComprobanteCliente dominio = null;
           if (command.iddetallecomprobantecliente.HasValue)
               dominio = _DetalleComprobanteClienteRepository.Get(x => x.iddetallecomprobantecliente == command.iddetallecomprobantecliente).LastOrDefault();
            else
               dominio = new DetalleComprobanteCliente();

          
            dominio.igv = command.igv;
            dominio.idproducto = command.idproducto;
            dominio.subtotal = command.subtotal;
            dominio.total = command.total;
            dominio.imei = command.imei;
            dominio.mac = command.mac;
            dominio.serie = command.serie;
            dominio.iddocumentocompra = command.iddocumentocompra;
            

            try
            {
                if (!command.iddetallecomprobantecliente.HasValue)
                    _DetalleComprobanteClienteRepository.Add(dominio);
                _DetalleComprobanteClienteRepository.Commit();


                return new InsertarActualizarDetalleComprobanteClienteOutput() {  iddetallecomprobantecliente  = dominio.iddetallecomprobantecliente };

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
