

using CommandContracts.Common;
using CommandContracts.Smartway.Mantenimiento.Output;
using CommandContracts.Smartway.Reparacion;
using CommandHandlers.Common;
using Domain.Common.Contracts;
using Domain.Smartway.Reparacion;
using System;
using System.Linq;
namespace CommandHandlers.Smartway.Reparacion
{
    public class InsertarActualizarCotizacionVentaDetalleHandler : ICommandHandler<InsertarActualizarVentaCotizacionDetalleCommand>
    {
        private readonly IRepository<VentaCotizacionDetalle> _VentaCotizacionDetalleRepository;


        public InsertarActualizarCotizacionVentaDetalleHandler(IRepository<VentaCotizacionDetalle> pVentaCotizacionDetalleRepository)
        {
            this._VentaCotizacionDetalleRepository = pVentaCotizacionDetalleRepository;
        }

        public CommandResult Handle(InsertarActualizarVentaCotizacionDetalleCommand command)
        {
            if (command == null) throw new ArgumentException("Tiene que ingresar una cliente");


            VentaCotizacionDetalle dominio = null;
            if (command.idcotizaciondetalle.HasValue)
                dominio = _VentaCotizacionDetalleRepository.Get(x => x.idcotizaciondetalle == command.idcotizaciondetalle).LastOrDefault();
            else
                dominio = new VentaCotizacionDetalle();


            dominio.cantidad = command.cantidad;
            dominio.costototal = command.costototal;
            dominio.costounitario = command.costounitario;
            dominio.descripcion = command.descripcion;
            dominio.descuentounitario = command.descuentounitario;
            dominio.idcotizacion = command.idcotizacion;
            dominio.iddiagnostico = command.iddiagnostico;
            dominio.idproducto = command.idproducto;
            dominio.idreparacion = command.idreparacion;

            try
            {
                if (!command.idcotizaciondetalle.HasValue)
                    _VentaCotizacionDetalleRepository.Add(dominio);
                _VentaCotizacionDetalleRepository.Commit();


                return new InsertarActualizarVentaCotizacionDetalleOutput() {       idcotizaciondetalle = dominio.idcotizaciondetalle };

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
