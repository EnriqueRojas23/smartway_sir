

using CommandContracts.Smartway.Despacho;
using CommandContracts.Smartway.Despacho.Output;
using CommandHandlers.Common;
using Domain.Common.Contracts;
using Domain.Smartway.Despacho;
using System;
using System.Linq;
namespace CommandHandlers.Smartway
{
    public class InsertarOrdenSalidaDetalleHandler : ICommandHandler<InsertarOrdenSalidaDetalleCommand>
    {
        private readonly IRepository<OrdenSalidaDetalle> _OrdenSalidaDetalleRepository;


        public InsertarOrdenSalidaDetalleHandler(IRepository<OrdenSalidaDetalle> pOrdenSalidaDetalleRepository)
        {
            _OrdenSalidaDetalleRepository = pOrdenSalidaDetalleRepository;
        }

        public CommandContracts.Common.CommandResult Handle(InsertarOrdenSalidaDetalleCommand command)
        {
            if (command == null) throw new ArgumentException("Tiene que ingresar una cliente");

            var dominio = new OrdenSalidaDetalle(); 
            dominio.cantidad = command.cantidad;
            dominio.fechahoraatencion = command.fechahoraatencion;
            dominio.idordensalida = command.idordensalida;
            dominio.idproducto = command.idproducto;
            dominio.idusuarioatencion = command.idusuarioatencion;
            dominio.imei = command.imei;
            dominio.mac = command.mac;
            dominio.repuesto = command.repuesto;
            dominio.serie = command.serie;
            

            try
            {

                _OrdenSalidaDetalleRepository.Add(dominio);
                _OrdenSalidaDetalleRepository.Commit();


                return new InsertarOrdenSalidaDetalleOutput() {    idordensalidadetalle = dominio.idordensalidadetalle };

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
