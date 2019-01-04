using AutoMapper;
using CommandContracts.Smartway.Facturacion;
using CommandContracts.Smartway.Facturacion.Output;
using QueryContracts.Smartway.Agendamiento.Incidencias.Parameters;
using QueryContracts.Smartway.Agendamiento.Incidencias.Results;
using QueryContracts.Smartway.Facturacion.Parameters;
using QueryContracts.Smartway.Facturacion.Results;
using ServiceAgents.Common;
using System;
using System.Collections.Generic;
using Web.Smartway.Areas.Agendamiento.Models;
using Web.Smartway.Areas.Mantenimiento.Models;

namespace Web.Smartway.DataAccess.Mantenimiento
{
    public class FacturacionData
    {
     
        public long insertarActualizarComprobanteCliente(ComprobanteModel model)
        {
            Mapper.CreateMap<ComprobanteModel, InsertarActualizarComprobanteClienteCommand>();
            var command = Mapper.Map<ComprobanteModel, InsertarActualizarComprobanteClienteCommand>(model);
            var resp =  (InsertarActualizarComprobanteClienteOutput)  command.Execute();

            return resp.iddocumentocompra;
        }
        public long insertarActualizarDetalleComprobanteCliente(DetalleComprobanteModel model)
        {
            Mapper.CreateMap<DetalleComprobanteModel, InsertarActualizarDetalleComprobanteClienteCommand>();
            var command = Mapper.Map<DetalleComprobanteModel, InsertarActualizarDetalleComprobanteClienteCommand>(model);
            var resp = (InsertarActualizarDetalleComprobanteClienteOutput)command.Execute();

            return resp.iddetallecomprobantecliente;
        }
        public static IEnumerable<ComprobanteModel> GetListarComprobante(int? idcliente, string numerocomprobante, int? idtipocomprobante)
        {

            var parametros = new ListarComprobantesParameters
            {
                idcliente = idcliente
                ,
                numerocomprobante = numerocomprobante
                ,
                idestado = 1
                ,
                idtipocomprobante = idtipocomprobante

            };
            var resultado = (ListarComprobantesResult)parametros.Execute();
            Mapper.CreateMap<ListarComprobantesDto, ComprobanteModel>();
            return Mapper.Map<IEnumerable<ListarComprobantesDto>, IEnumerable<ComprobanteModel>>(resultado.Hits);
        }
        public static IEnumerable<DetalleComprobanteModel> GetListarDetalleComprobante(long? iddocumentocompra)
        {
            var parametros = new ListarDetalleComprobantesParameters
            {
                iddocumentocompra = iddocumentocompra
            };
            var resultado = (ListarDetalleComprobantesResult)parametros.Execute();
            Mapper.CreateMap<ListarDetalleComprobantesDto, DetalleComprobanteModel>();
            return Mapper.Map<IEnumerable<ListarDetalleComprobantesDto>, IEnumerable<DetalleComprobanteModel>>(resultado.Hits);

        }

    }
}