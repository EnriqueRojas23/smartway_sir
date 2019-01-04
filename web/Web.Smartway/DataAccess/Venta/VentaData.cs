using AutoMapper;
using CommandContracts.Smartway.Mantenimiento.Output;
using CommandContracts.Smartway.Reparacion;
using QueryContracts.Smartway.Reparacion.Parameters;
using QueryContracts.Smartway.Reparacion.Results;
using ServiceAgents.Common;
using System.Collections.Generic;
using Web.Smartway.Areas.Reparacion.Models;

namespace Web.Smartway.DataAccess.Venta
{
    public class VentaData
    {
        /// <summary>
        /// Inserta o Actualiza la Venta Cotización
        /// </summary>
        /// <param tipooperacion 1="Insertar"></param>
        /// <param tipooperacion 2="Aprobar/Rechazar"></param>
        /// <returns></returns>
        public long insertarActualizarCotizacion(VentaCotizacionModel model)
        {
            Mapper.CreateMap<VentaCotizacionModel, InsertarActualizarVentaCotizacionCommand >();
            var command = Mapper.Map<VentaCotizacionModel, InsertarActualizarVentaCotizacionCommand>(model);
            var resp = (InsertarActualizarVentaCotizacionOutput)command.Execute();
            return resp.idcotizacion;
        }
        public long? insertarActualizarDetalleCotizacion(VentaCotizacionDetalleModel model)
        {
            Mapper.CreateMap<VentaCotizacionDetalleModel, InsertarActualizarVentaCotizacionDetalleCommand>();
            var command = Mapper.Map<VentaCotizacionDetalleModel, InsertarActualizarVentaCotizacionDetalleCommand>(model);
            var resp = (InsertarActualizarVentaCotizacionDetalleOutput)command.Execute();
            return resp.idcotizaciondetalle;
        }
        public static IEnumerable<VentaCotizacionDetalleModel> listarCotizacionDetalle(long idordenservicio)
        {
            var parametros = new ListarVentaCotizacionDetalleParameters
            {
                   idordenservicio = idordenservicio
            };
            var resultado = (ListarVentaCotizacionDetalleResult)parametros.Execute();
            Mapper.CreateMap<ListarVentaCotizacionDetalleDto, VentaCotizacionDetalleModel>();
            return Mapper.Map<IEnumerable<ListarVentaCotizacionDetalleDto>, IEnumerable<VentaCotizacionDetalleModel>>(resultado.Hits);

        }
    }
}