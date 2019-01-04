using AutoMapper;
using CommandContracts.Smartway.Agendamiento;
using CommandContracts.Smartway.Agendamiento.Output;
using QueryContracts.Smartway.Agendamiento.Incidencias.Parameters;
using QueryContracts.Smartway.Agendamiento.Incidencias.Results;
using QueryContracts.Smartway.Facturacion.Parameters;
using QueryContracts.Smartway.Facturacion.Results;
using ServiceAgents.Common;
using System.Collections.Generic;
using Web.Smartway.Areas.Agendamiento.Models;
using System;
using Web.Smartway.Areas.Mantenimiento.Models;

namespace Web.Smartway.DataAccess.Mantenimiento
{
    public class AgendamientoData
    {
        
       

        public long insertarIncidenciaSolucion(SolucionModel model)
        {
            Mapper.CreateMap<SolucionModel, InsertarIncidenciaSolucionCommand>();
            var command = Mapper.Map<SolucionModel, InsertarIncidenciaSolucionCommand>(model);
            var resp = (InsertarIncidenciaSolucionOutput)command.Execute();
            return resp.idincidenciasolucion;

        }
        public long insertarIncidenciaEvaluacion(EvaluacionModel model)
        {
            Mapper.CreateMap<EvaluacionModel, InsertarIncidenciaEvaluacionCommand>();
            var command = Mapper.Map<EvaluacionModel, InsertarIncidenciaEvaluacionCommand>(model);
            var resp = (InsertarIncidenciaEvaluacionOutput)command.Execute();
            return resp.idevaluaciongarantia;

        }
        public PropuestaModel obtenerPropuesta(int idpropuesta)
        {
            var parametros = new ObtenerPropuestaParameter
            {
                idpropuesta = idpropuesta
            };
            var resultado = (ObtenerPropuestaResult)parametros.Execute();
            Mapper.CreateMap<ObtenerPropuestaResult, PropuestaModel>();
            return Mapper.Map<ObtenerPropuestaResult, PropuestaModel>(resultado);
        }
        public static IEnumerable<AccesorioModel> GetListarAccesorios()
        {
            var parametros = new ListarAccesoriosParameter { };
            var resultado = (ListarAccesoriosResult)parametros.Execute();

            Mapper.CreateMap<ListarAccesoriosDto, AccesorioModel>();
            var resp = Mapper.Map<IEnumerable<ListarAccesoriosDto>, IEnumerable<AccesorioModel>>(resultado.Hits);

            return resp;
            //Mapper.CreateMap<ListarIncidenciaCotizacionDto, CotizacionDetalleModel>();
            //return Mapper.Map<IEnumerable<ListarIncidenciaCotizacionDto>, IEnumerable<CotizacionDetalleModel>>(resultado.Hits);

            //return resultado == null ? new List<ListarAccesoriosDto>() : resultado.Hits.ToList();
        }
        public static IEnumerable<EvaluacionModel> ListarIncidenciaEvaluacion(long idincidencia)
        {
            var parametros = new ListarIncidenciaEvaluacionParameter  { idincidencia = idincidencia };
            var resultado = (ListarIncidenciaEvaluacionResult)parametros.Execute();

            Mapper.CreateMap<ListarIncidenciaEvaluacionDto, EvaluacionModel>();
            var resp = Mapper.Map<IEnumerable<ListarIncidenciaEvaluacionDto>, IEnumerable<EvaluacionModel>>(resultado.Hits);
            return resp;
        }
        internal void eliminarEvaluacionPrevia(long? idincidencia)
        {
            var model = new EvaluacionModel();
            model.idincidencia = idincidencia;

            Mapper.CreateMap<EvaluacionModel, EliminarIncidenciaEvaluacionCommand>();
            var command = Mapper.Map<EvaluacionModel, EliminarIncidenciaEvaluacionCommand>(model);
            var resp = (InsertarIncidenciaEvaluacionOutput)command.Execute();
        }

        internal TarifaModel calcularTarifa(int idtipoproducto, int idnivelreparacion, int idpartner)
        {
            var parametros = new CalcularTarifaParameter
            {
                idnivelreparacion = idnivelreparacion,
                idpartner = idpartner,
                idtipoproducto = idtipoproducto
            };
            var result = (CalcularTarifaResult) parametros.Execute();
            Mapper.CreateMap<CalcularTarifaResult, TarifaModel>();
            var res = Mapper.Map<CalcularTarifaResult, TarifaModel>(result);
            return res;
            
        }
        public long? insertarActualizarAccesorioIncidencia(EstadoFisicoModel model)
        {
            Mapper.CreateMap<EstadoFisicoModel, InsertarActualizarAccesorioIncidenciaCommand  >();
            var command = Mapper.Map<EstadoFisicoModel, InsertarActualizarAccesorioIncidenciaCommand>(model);
            var resp = (InsertarActualizarIncidenciaOutput)command.Execute();
            return resp.idincidencia;
        }
        public static bool EvaluarGarantia(DateTime hoy, DateTime fechaemision, GarantiaModel garantia)
        {
            if (garantia == null) return false;
            var diferencia = (hoy - fechaemision).TotalDays;
            if (garantia.periodo > diferencia)
                return true;
            return false;
        }


    }
}