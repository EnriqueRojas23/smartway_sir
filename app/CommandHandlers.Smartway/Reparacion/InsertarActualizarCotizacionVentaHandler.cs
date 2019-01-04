

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
    public class InsertarActualizarCotizacionVentaHandler : ICommandHandler<InsertarActualizarVentaCotizacionCommand>
    {
        private readonly IRepository<VentaCotizacion> _VentaCotizacionRepository;


        public InsertarActualizarCotizacionVentaHandler(IRepository<VentaCotizacion> pVentaCotizacionRepository)
        {
            this._VentaCotizacionRepository = pVentaCotizacionRepository;
        }

        public CommandResult Handle(InsertarActualizarVentaCotizacionCommand command)
        {
            if (command == null) throw new ArgumentException("Tiene que ingresar una cliente");


            VentaCotizacion dominio = null;
           if (command.idcotizacion.HasValue)
               dominio = _VentaCotizacionRepository.Get(x => x.idcotizacion == command.idcotizacion).LastOrDefault();
            else
               dominio = new VentaCotizacion();



            switch (command.__tipooperacion)
            {
                case 1:
                    dominio.fechahoraregistro = command.fechahoraregistro;
                    dominio.aceptado = command.aceptado;
                    dominio.descuento = command.descuento;
                    dominio.descuentonotacredito = command.descuentonotacredito;
                    dominio.generoventa = command.generoventa;
                    dominio.idcliente = command.idcliente;
                    dominio.idmoneda = command.idmoneda;
                    dominio.idnotacredito = command.idnotacredito;
                    dominio.idordenservicio = command.idordenservicio;
                    dominio.idsucursal = command.idsucursal;
                    dominio.idusuarioregistro = command.idusuarioregistro;
                    dominio.igv = command.igv;
                    dominio.notacredito = command.notacredito;
                    dominio.subtotal = command.subtotal;
                    dominio.tipocambio = command.tipocambio;
                    dominio.total = command.total;
                    break;
                case 2:
                    dominio.aceptado = command.aceptado;
                    break;
                default:
                    break;
            }

           





            try
            {
                if (!command.idcotizacion.HasValue)
                    _VentaCotizacionRepository.Add(dominio);
                _VentaCotizacionRepository.Commit();


                return new InsertarActualizarVentaCotizacionOutput() {      idcotizacion = dominio.idcotizacion };

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
