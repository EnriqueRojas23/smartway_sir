using AutoMapper;

using ServiceAgents.Common;
using System.Collections.Generic;
using QueryContracts.Smartway.Reparacion.Parameters;
using QueryContracts.Smartway.Reparacion.Results;
using Web.Smartway.Areas.Agendamiento.Models;
using Web.Smartway.Areas.Despacho.Models;
using CommandContracts.Smartway.Mantenimiento.Output;
using CommandContracts.Smartway.Reparacion;
using Web.Smartway.Areas.Reparacion.Models;
using QueryContracts.Smartway.Despacho.Parameters;
using System.Linq;

namespace Web.Smartway.DataAccess.Reparaciones
{
    public class ReparacionesData
    {
        public static IEnumerable<OrdenServicioModel> GetListarReparaciones(int? idestado
            , string fechainicio,string fechafin, string numeroordenservicio, int? idtecnico, string serie, int? idsupervisor = null)
        {   
            var parametros = new ListarOrdenServicioParameters
            {
                 fechafin = fechafin,
                 fechainicio = fechainicio,
                 idestado = idestado,
                 idtecnico = idtecnico,
                 numeroordenservicio = numeroordenservicio,
                 serie = serie,
                 idsupervisor = idsupervisor
                 
            };
            var resultado = (ListarOrdenServicioResult)parametros.Execute();
            Mapper.CreateMap<ListarOrdenServicioDto, OrdenServicioModel>();
            return Mapper.Map<IEnumerable<ListarOrdenServicioDto>, IEnumerable<OrdenServicioModel>>(resultado.Hits);
        }

        internal long InsertarActualizarOrdenTrabajo(OrdenTrabajoModel modOrdenTrabajo)
        {
            Mapper.CreateMap<OrdenTrabajoModel, InsertarActualizarOrdenTrabajoCommand>();
            var command = Mapper.Map<OrdenTrabajoModel, InsertarActualizarOrdenTrabajoCommand>(modOrdenTrabajo);

            var result = (InsertarActualizarOrdenTrabajoOutput)command.Execute();
            return result.idordentrabajo;
        }
        internal long InsertarActualizarOrdenTrabajoDetalle(OrdenTrabajoDetalleModel modOrdenTrabajo)
        {
            Mapper.CreateMap<OrdenTrabajoDetalleModel, InsertarActualizarOrdenTrabajoDetalleCommand>();
            var command = Mapper.Map<OrdenTrabajoDetalleModel, InsertarActualizarOrdenTrabajoDetalleCommand>(modOrdenTrabajo);

            var result = (InsertarActualizarOrdenTrabajoDetalleOutput)command.Execute();
            return result.idordentrabajodetalle;
        }

        public static void solicitarRepuesto()
        {
            MailHelper.EnviarMail("enrique.rojas@riabc.net", "Prueba", "prueba", false);
        }
        public IEnumerable<OrdenTrabajoTiempoModel> GetListarOrdenTrabajoTiempo(long idordentrabajo)
        {
            var parametros = new ListarOrdenTrabajoTiempoParameters
            {
                idordentrabajo = idordentrabajo
            };
            var resultado = (ListarOrdenTrabajoTiempoResult)parametros.Execute();
            Mapper.CreateMap<ListarOrdenTrabajoTiempoDto, OrdenTrabajoTiempoModel>();
            return Mapper.Map<IEnumerable<ListarOrdenTrabajoTiempoDto>, IEnumerable<OrdenTrabajoTiempoModel>>(resultado.Hits);
        }

        public static IEnumerable<OrdenTrabajoDetalleModel> GetListarOrdenTrabajoDetalle(long? idordentrabajo)
        {
            var parametros = new ListarOrdenTrabajoDetalleParameters
            {
                 idordentrabajo = idordentrabajo
            };
            var resultado = (ListarOrdenTrabajoDetalleResult)parametros.Execute();
            Mapper.CreateMap<ListarOrdenTrabajoDetalleDto, OrdenTrabajoDetalleModel>();
            return Mapper.Map<IEnumerable<ListarOrdenTrabajoDetalleDto>, IEnumerable<OrdenTrabajoDetalleModel>>(resultado.Hits);
        }
  
        public OrdenTrabajoModel obtenerOrdenTrabajo(long idordentrabajo)
        {
            var parametros = new ObtenerOrdenTrabajoParameter
            {
                  idordentrabajo = idordentrabajo
            };
            var resultado = (ObtenerOrdenTrabajoResult)parametros.Execute();
            Mapper.CreateMap<ObtenerOrdenTrabajoResult, OrdenTrabajoModel>();
            return Mapper.Map<ObtenerOrdenTrabajoResult, OrdenTrabajoModel>(resultado);
        }
        internal long insertarIniciarReparacion(OrdenTrabajoTiempoModel model)
        {
            Mapper.CreateMap<OrdenTrabajoTiempoModel, InsertarActualizarOrdenTrabajoTiempoCommand>();
            var command = Mapper.Map<OrdenTrabajoTiempoModel, InsertarActualizarOrdenTrabajoTiempoCommand>(model);

            var result = (InsertarActualizarOrdenTrabajoTiempoOutput)command.Execute();
            return result.idordentrabajotiempo;
        }

        #region Antecedentes
        public static List<ListarAntecedentesOrdenServicioDto> GetListarAntecedentesOrdenesServicio(long idordenservicio)
        {
            var parametros = new ListarAntecedentesParameter {  idordenservicio = idordenservicio };
            var resultado = (ListarAntecedentesResult)parametros.Execute();
            return resultado == null ? new List<ListarAntecedentesOrdenServicioDto>() : resultado.Historico.ToList();
        }
        public static List<ListarAntecedentesOrdenServicioDetalleDto> GetListarAntecedentesOrdenesServicioDetalle(long idordenservicio)
        {
            var parametros = new ListarAntecedentesDetalleParameter { idordenservicio = idordenservicio };
            var resultado = (ListarAntecedentesDetalleResult)parametros.Execute();
            return resultado == null ? new List<ListarAntecedentesOrdenServicioDetalleDto>() : resultado.Historico.ToList();
        }
        //public static List<ListarAntecedentesOrdenServicioDto> GetListarAntecedentesClientes(long idordenservicio)
        //{
        //    var parametros = new ListarAntecedentesParameter { idordenservicio = idordenservicio };
        //    var resultado = (ListarAntecedentesResult)parametros.Execute();
        //    return resultado == null ? new List<ListarAntecedentesOrdenServicioDto>() : resultado.Clientes.ToList();
        //}

        #endregion
    }
}