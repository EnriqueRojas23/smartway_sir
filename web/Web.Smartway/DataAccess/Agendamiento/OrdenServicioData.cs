using AutoMapper;
using CommandContracts.Smartway.Agendamiento;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Web.Smartway.Areas.Agendamiento.Models;
using ServiceAgents.Common;
using CommandContracts.Smartway.Agendamiento.Output;
using QueryContracts.Smartway.Agendamiento.Parameters;
using QueryContracts.Smartway.Agendamiento.Results;
using QueryContracts.Smartway.Reparacion.Results;
using QueryContracts.Smartway.Despacho.Parameters;

namespace Web.Smartway.DataAccess.Agendamiento
{
    public class OrdenServicioData
    {

        public OrdenServicioModel  InsertarActualizarOrdenServicio(OrdenServicioModel modOrdenServicio)
        {

            Mapper.CreateMap<OrdenServicioModel, InsertarActualizarOrdenServicioCommand>();
            var command = Mapper.Map<OrdenServicioModel, InsertarActualizarOrdenServicioCommand>(modOrdenServicio);
            var result = (InsertarActualizarOrdenServicioOutput)command.Execute();
            modOrdenServicio.idordenserviciotecnico = result.idordenservicio;
            modOrdenServicio.numeroordenservicio = result.numeroordenservicio;
            return modOrdenServicio;

        }

 
        public IEnumerable<OrdenServicioModel> listarOrdenServicio(int? idtipoordenservicio,int? idestado, string fecini, string fecfin,  string numeroordenservicio)
        {
            var parametros = new ListarOrdenServicioParameters
            {
                 fecfin = fecfin,
                 fecini = fecini,
                 idtipoordenservicio = idtipoordenservicio,
                 numeroordenservicio = numeroordenservicio,
                 idestado = idestado
            };
            var resultado = (QueryContracts.Smartway.Agendamiento.Results.ListarOrdenServicioResult)parametros.Execute();
            Mapper.CreateMap<QueryContracts.Smartway.Agendamiento.Results.ListarOrdenServicioDto, OrdenServicioModel>();
            return Mapper.Map<IEnumerable<QueryContracts.Smartway.Agendamiento.Results.ListarOrdenServicioDto>, IEnumerable<OrdenServicioModel>>(resultado.Hits);
        }
        public OrdenServicioModel obtenerOrdenServicio(long idordenservicio)
        {
            var parametros = new ObtenerOrdenServicioParameter
            {
                idordenservicio = idordenservicio
            };
            var resultado = (ObtenerOrdenServicioResult)parametros.Execute();
            Mapper.CreateMap<ObtenerOrdenServicioResult, OrdenServicioModel>();
            return Mapper.Map<ObtenerOrdenServicioResult, OrdenServicioModel>(resultado);
        }
        
        
    }
}