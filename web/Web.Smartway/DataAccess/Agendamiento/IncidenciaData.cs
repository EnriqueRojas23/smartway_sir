using AutoMapper;
using CommandContracts.Smartway.Agendamiento;
using CommandContracts.Smartway.Agendamiento.Output;
using QueryContracts.Smartway.Agendamiento.Incidencias.Parameters;
using QueryContracts.Smartway.Agendamiento.Incidencias.Results;
using QueryContracts.Smartway.Facturacion.Parameters;
using QueryContracts.Smartway.Facturacion.Results;
using ServiceAgents.Common;
using System;
using System.Collections.Generic;
using Web.Smartway.Areas.Agendamiento.Models;
using Web.Smartway.Areas.Mantenimiento.Models;

namespace Web.Smartway.DataAccess.Agendamiento
{
    public class IncidenciaData
    {
     
        public IncidenciaModel insertarActualizarIncidencia(IncidenciaModel model)
        {
            Mapper.CreateMap<IncidenciaModel, InsertarActualizarIncidenciaCommand>();
            var command = Mapper.Map<IncidenciaModel, InsertarActualizarIncidenciaCommand>(model);

            var resp =  (InsertarActualizarIncidenciaOutput)  command.Execute();

            model.numeroincidencia = resp.numeroincidencia;
            model.idincidencia = resp.idincidencia;

            return model;
        }
        public IEnumerable<IncidenciaModel> ListarIncidencias(string numeroincidencia , string numerodocumento , string fechaInicio, string fechafin )
        {
            var parameter = new ListarIncidenciaParameter
            {
                fechafin = fechafin,
                fechainicio = fechaInicio,
                numerodocumento = numerodocumento,
                numeroincidencia = numeroincidencia
            };
            Mapper.CreateMap<ListarIncidenciaDto, IncidenciaModel>();
            var result = (ListarIncidenciaResult)parameter.Execute();
            return Mapper.Map<IEnumerable<ListarIncidenciaDto>, IEnumerable<IncidenciaModel>>(result.Hits);
        }
        public IEnumerable<GarantiaModel> ListarEvaluarGarantia(int idtipoproducto, int idfabricante, int? idpartner)
        {

            var parameter = new ListarEvaluarGarantiaParameter
            {
                 idfabricante = idfabricante
                 ,idtipoproducto = idtipoproducto
                 ,idpartner = idpartner
            };
            Mapper.CreateMap<ListarEvaluarGarantiaDto, GarantiaModel>();
            var result = (ListarEvaluarGarantiaResult)parameter.Execute();
            return Mapper.Map<IEnumerable<ListarEvaluarGarantiaDto>, IEnumerable<GarantiaModel>>(result.Hits);
        }
        public IEnumerable<ListarCondiciones> ListarCondiciones(int idtipoproducto, int idfabricante)
        {

            var parameter = new ListarCondicionesParameter
            {
                idfabricante = idfabricante
                 ,
                idtipoproducto = idtipoproducto
            };
            Mapper.CreateMap<ListarCondicionesDto, ListarCondiciones>();
            var result = (ListarCondicionesResult)parameter.Execute();
            
            return Mapper.Map<IEnumerable<ListarCondicionesDto>, IEnumerable<ListarCondiciones>>(result.Hits);
        }

        public IncidenciaModel ObtenerIncidencia(long idincidencia)
        {
            var parameter = new ObtenerIncidenciaParameter { idincidencia = idincidencia };
            Mapper.CreateMap<ObtenerIncidenciaResult, IncidenciaModel>();
            var result = (ObtenerIncidenciaResult) parameter.Execute();
            
            return Mapper.Map<ObtenerIncidenciaResult, IncidenciaModel>(result);

        }
        public IEnumerable<ProductoModel> listarRepuestos(int idrepacion, int idproducto)
        {
            var parameter = new ListarRepuestosParameter
            {
                idreparacion = idrepacion
                ,idproducto = idproducto
            };
            Mapper.CreateMap<ListarRepuestosDto, ProductoModel>();
            var result = (ListarRepuestosResult)parameter.Execute();
            return Mapper.Map<IEnumerable<ListarRepuestosDto>, IEnumerable<ProductoModel>>(result.Hits);
        }
        public IEnumerable<PropuestaModel> listarPropuestaSolucion(int? idtipogarantia)
        {
            var parameter = new ListarPropuestasSolucionParameter
            {
                idtipogarantia = idtipogarantia
            };
            Mapper.CreateMap<ListarPropuestasSolucionDto, PropuestaModel>();
            var result = (ListarPropuestasSolucionResult)parameter.Execute();
            return Mapper.Map<IEnumerable<ListarPropuestasSolucionDto>, IEnumerable<PropuestaModel>>(result.Hits);
        }

            

    }
}