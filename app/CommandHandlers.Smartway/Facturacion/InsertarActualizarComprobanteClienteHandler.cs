

using CommandContracts.Smartway.Facturacion;
using CommandContracts.Smartway.Facturacion.Output;
using CommandHandlers.Common;
using Domain.Common.Contracts;
using Domain.Smartway.Facturacion;
using System;
using System.Linq;
namespace CommandHandlers.Smartway
{
    public class InsertarActualizarComprobanteClienteHandler : ICommandHandler<InsertarActualizarComprobanteClienteCommand>
    {
        private readonly IRepository<ComprobanteCliente> _ComprobanteClienteRepository;


        public InsertarActualizarComprobanteClienteHandler(IRepository<ComprobanteCliente> pComprobanteClienteRepository)
        {
            this._ComprobanteClienteRepository = pComprobanteClienteRepository;
        }

        public CommandContracts.Common.CommandResult Handle(InsertarActualizarComprobanteClienteCommand command)
        {
            if (command == null) throw new ArgumentException("Tiene que ingresar un comando");


            ComprobanteCliente dominio = null;
           if (command.iddocumentocompra.HasValue)
               dominio = _ComprobanteClienteRepository.Get(x => x.iddocumentocompra == command.iddocumentocompra).LastOrDefault();
            else
               dominio = new ComprobanteCliente();

            if (!command.iddocumentocompra.HasValue)
            {
                dominio.fechahoraregistro = command.fechahoraregistro;
                dominio.idusuarioregistro = command.idusuarioregistro;
            }
            dominio.igv = command.igv;
            dominio.descripcion = command.descripcion;
            dominio.subtotal = command.subtotal;
            dominio.total = command.total;
            dominio.fechaemision = command.fechaemision;
            dominio.idestado = command.idestado;
            dominio.idcliente = command.idcliente;
            dominio.idconceptofacturacion = command.idconceptofacturacion;
            dominio.idsucursalventa = command.idsucursalventa;
            dominio.numerocomprobante = command.numerocomprobante;
            dominio.total = command.total;
            dominio.ventaenlinea = command.ventaenlinea;
            dominio.ventapartner = command.ventapartner;
            dominio.idtipodocumentocompra = command.idtipodocumentocompra;
            dominio.idpartner = command.idpartner;
            
            

            try
            {
                if (!command.iddocumentocompra.HasValue)
                    _ComprobanteClienteRepository.Add(dominio);
                _ComprobanteClienteRepository.Commit();


                return new InsertarActualizarComprobanteClienteOutput() {      iddocumentocompra = dominio.iddocumentocompra };

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
