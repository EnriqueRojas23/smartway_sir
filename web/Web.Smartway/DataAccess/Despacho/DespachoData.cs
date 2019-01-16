using AutoMapper;
using ServiceAgents.Common;
using System.Collections.Generic;
using Web.Smartway.Areas.Agendamiento.Models;
using Web.Smartway.Areas.Mantenimiento.Models;
using QueryContracts.Smartway.Despacho.Results;
using Web.Smartway.Areas.Despacho.Models;
using QueryContracts.Smartway.Despacho.Parameters;
using CommandContracts.Smartway.Despacho;
using CommandContracts.Smartway.Despacho.Output;

namespace Web.Smartway.DataAccess.Mantenimiento
{
    public class DespachoData
    {
        public static IEnumerable<ProgramacionModel> GetListarProgramacion(int? idsucursalorigen
            , int? idsucursaldestino
            , int? idestado
            , string fechainicio
            , string fechafin)
        {   

            var parametros = new ListarProgramacionParameter
            {
                fechafin = fechafin,
                fechaini = fechainicio,
                idestado = idestado,
                idsucursaldestino = idsucursaldestino,
                idsucursalorigen = idsucursalorigen
                
            };
            var resultado = (ListarProgramacionResult)parametros.Execute();
            Mapper.CreateMap<ListarProgramacionDto, ProgramacionModel>();
            return Mapper.Map<IEnumerable<ListarProgramacionDto>, IEnumerable<ProgramacionModel>>(resultado.Hits);
        }
      
       

        public IEnumerable<TransportistaModel> GetListarTransportista()
        {
            var parametros = new ListarTransporteParameter
            {
                
            };
            var resultado = (ListarTransporteResult)parametros.Execute();
            Mapper.CreateMap<ListarTransporteDto, TransportistaModel>();
            return Mapper.Map<IEnumerable<ListarTransporteDto>, IEnumerable<TransportistaModel>>(resultado.Hits);
        }

        public IEnumerable<GuiaRemisionModel> GetListarGuia(int? idestado
            , int? idsucursaldestino, int? idsucursalorigen)
        {
            var parametros = new ListarGuiaRemisionParameter
            {
                 idestado = idestado,
                 idsucursaldestino = idsucursaldestino,
                 idsucursalorigen = idsucursalorigen
            };
            var resultado = (ListarGuiaRemisionResult)parametros.Execute();
            Mapper.CreateMap<ListarGuiaRemisionDto, GuiaRemisionModel>();
            return Mapper.Map<IEnumerable<ListarGuiaRemisionDto>, IEnumerable<GuiaRemisionModel>>(resultado.Hits);
        }
        public int InsertarActualizarProgramacion(ProgramacionModel modProgramacion)
        {
            Mapper.CreateMap<ProgramacionModel, InsertarActualizarProgramacionCommand>();
            var command = Mapper.Map<ProgramacionModel, InsertarActualizarProgramacionCommand>(modProgramacion);

            var result = (InsertarActualizarProgramacionOutput)  command.Execute();
            return result.idprogramacion;
        }
        public int InsertarActualizarProgramacionDetalle(ProgramacionDetalleModel modProgramacion)
        {
            Mapper.CreateMap<ProgramacionDetalleModel, InsertarActualizarProgramacionDetalleCommand>();
            var command = Mapper.Map<ProgramacionDetalleModel, InsertarActualizarProgramacionDetalleCommand>(modProgramacion);

            var result = (InsertarActualizarProgramacionDetalleOutput)command.Execute();
            return result.idprogramaciondetalle;
        }

        public GuiaRemisionModel obtenerGuiaRemision(long idguiaremision)
        {
            var parameter = new ObtenerGuiaRemisionParameter { idguiaremision = idguiaremision };
            var result = (ObtenerGuiaRemisionResult) parameter.Execute();

            Mapper.CreateMap<ObtenerGuiaRemisionResult, GuiaRemisionModel>();
            return Mapper.Map<ObtenerGuiaRemisionResult, GuiaRemisionModel>(result);
            
        }
        public long InsertarActualizarGuiaRemision(GuiaRemisionModel modGuiaRemision)
        {
            Mapper.CreateMap<GuiaRemisionModel, InsertarActualizarGuiaRemisionCommand>();
            var command = Mapper.Map<GuiaRemisionModel, InsertarActualizarGuiaRemisionCommand>(modGuiaRemision);

            var result = (InsertarActualizarGuiaRemisionOutput)command.Execute();
            return result.idguiaremision;
        }

        public long InsertarOrdenSalida (OrdenSalidaModel model)
        {
            Mapper.CreateMap<OrdenSalidaModel, InsertarOrdenSalidaCommand>();
            var command = Mapper.Map<OrdenSalidaModel, InsertarOrdenSalidaCommand>(model);

            var result = (InsertarOrdenSalidaOutput)command.Execute();
            return result.iddocumentosalida;
        }

        public bool EntregarDespachoDelivery(long idprogramacion)
        {
            var parameter = new EntregarDespachoDeliveryParameter
            {
                idprogramacion = idprogramacion
            };
            var result  = (EntregarDespachoDeliveryResult) parameter.Execute();
            return result.respuesta;

        }
        public long InsertarOrdenSalidaDetalle(OrdenSalidaDetalleModel model)
        {
            Mapper.CreateMap<OrdenSalidaDetalleModel, InsertarOrdenSalidaDetalleCommand>();
            var command = Mapper.Map<OrdenSalidaDetalleModel, InsertarOrdenSalidaDetalleCommand>(model);

            var result = (InsertarOrdenSalidaDetalleOutput)command.Execute();
            return result.idordensalidadetalle;
        }
        public IEnumerable<OrdenSalidaModel> GetListarOrdenSalida(long idordensalida)
        {
            var parametros = new ListarOrdenSalidaParameter
            {
                 idordensalida = idordensalida,
            };
            var resultado = (ListarOrdenSalidaResult)parametros.Execute();
            Mapper.CreateMap<ListarOrdenSalidaDto, OrdenSalidaModel>();
            return Mapper.Map<IEnumerable<ListarOrdenSalidaDto>, IEnumerable<OrdenSalidaModel>>(resultado.Hits);
        }

    }
}