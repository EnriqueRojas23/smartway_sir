

using CommandContracts.Common;
using CommandContracts.Smartway.Mantenimiento.Output;
using CommandContracts.Smartway.Reparacion;
using CommandHandlers.Common;
using Domain.Common.Contracts;
using Domain.Smartway.Inventario;
using Domain.Smartway.Reparacion;
using System;
using System.Linq;
namespace CommandHandlers.Smartway.Reparacion
{
    public class InsertarActualizarDocumentoRecepcionDetalleHandler : ICommandHandler<InsertarActualizarDocumentoRecepcionDetalleCommand>
    {
        private readonly IRepository<DocumentoRecepcionDetalle> _DocumentoRecepcionDetalleRepository;
        public InsertarActualizarDocumentoRecepcionDetalleHandler(IRepository<DocumentoRecepcionDetalle> pDocumentoRecepcionDetalleRepository)
        {
            this._DocumentoRecepcionDetalleRepository = pDocumentoRecepcionDetalleRepository;
        }
        public CommandResult Handle(InsertarActualizarDocumentoRecepcionDetalleCommand command)
        {
            if (command == null) throw new ArgumentException("Tiene que ingresar una cliente");


            DocumentoRecepcionDetalle dominio = null;
            if (command.iddocumentorecepciondetalle.HasValue)
                dominio = _DocumentoRecepcionDetalleRepository.Get(x => x.iddocumentorecepciondetalle == command.iddocumentorecepciondetalle).LastOrDefault();
            else
                dominio = new DocumentoRecepcionDetalle();

            dominio.caja = command.caja;
            dominio.cantidad = command.cantidad;
            dominio.fechahorapersonalizacion = command.fechahorapersonalizacion;
            dominio.fila = command.fila;
            dominio.iddocumentorecepcion = command.iddocumentorecepcion;
            dominio.idmodelo = command.idmodelo;
            dominio.idproducto = command.idproducto;
            dominio.idtipoproducto = command.idtipoproducto;
            dominio.idusuariopersonalizacion= command.idusuariopersonalizacion;
            dominio.imei = command.imei;
            dominio.mac = command.mac;
            dominio.numeropallet = command.numeropallet;
            dominio.repuesto = command.repuesto;
            dominio.serie = command.serie;
            




            try
            {
                if (!command.iddocumentorecepciondetalle.HasValue)
                    _DocumentoRecepcionDetalleRepository.Add(dominio);
                _DocumentoRecepcionDetalleRepository.Commit();

               

                return new InsertarActualizarDocumentoRecepcionDetalleOutput() {         iddocumentorecepciondetalle = dominio.iddocumentorecepciondetalle };

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
