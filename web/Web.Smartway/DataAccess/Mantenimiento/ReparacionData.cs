using AutoMapper;
using CommandContracts.Smartway.Mantenimiento;
using CommandContracts.Smartway.Mantenimiento.Output;
using QueryContracts.Smartway.Mantenimiento.Parameters;
using QueryContracts.Smartway.Mantenimiento.Results;
using ServiceAgents.Common;
using System.Collections.Generic;
using System.Linq;
using Web.Smartway.Areas.Mantenimiento.Models;

namespace Web.Smartway.DataAccess.Mantenimiento
{
    public class ReparacionData
    {

        public IEnumerable<ReparacionModel> listarReparacion(int? idcategoriareparacion
            , int? idtipoproducto
            , int? idreparacion)
        {
            var parametros = new ListarReparacionParameters {
                idtipoproducto = idtipoproducto,
                idcategoriareparacion = idcategoriareparacion,
                 idreparacion = idreparacion

            };
            var resultado = (ListarReparacionResult)parametros.Execute();

            Mapper.CreateMap<ListarReparacionDto, ReparacionModel>();
            return Mapper.Map<IEnumerable<ListarReparacionDto>, IEnumerable<ReparacionModel>>(resultado.Hits);

        }

        public static IEnumerable<TipoReparacionModel> GetListarTiposFalla()
        {

            var parametros = new ListarTipoReparacionParameters {    };
            var resultado = (ListarTipoReparacionResult)parametros.Execute();

            Mapper.CreateMap<ListarTipoReparacionDto, TipoReparacionModel>();
            return Mapper.Map<IEnumerable<ListarTipoReparacionDto>, IEnumerable<TipoReparacionModel>>(resultado.Hits);
        }
        public static IEnumerable<CategoriaReparacionModel> GetListarCategoriaReparacion()
        {
            var parametros = new ListarCategoriaReparacionParameters { };
            var resultado = (ListarCategoriaReparacionResult)parametros.Execute();

            Mapper.CreateMap<ListarCategoriaReparacionDto, CategoriaReparacionModel>();
            return Mapper.Map<IEnumerable<ListarCategoriaReparacionDto>, IEnumerable<CategoriaReparacionModel>>(resultado.Hits);
        }
        public int InsertarActualizarReparacion (ReparacionModel model)
        {
            Mapper.CreateMap<ReparacionModel, InsertarActualizarReparacionCommand>();
            var command = Mapper.Map<ReparacionModel, InsertarActualizarReparacionCommand> (model);
            var result = (InsertarActualizarReparacionOutput) command.Execute();
            return result.idreparacion;
        }

        public static IEnumerable<TipoReparacionModel> listarTipoReparacion()
        {
            var parametros = new ListarTipoReparacionParameters { };
            var resultado = (ListarTipoReparacionResult)parametros.Execute();

            Mapper.CreateMap<ListarTipoReparacionDto, TipoReparacionModel>();
            return Mapper.Map<IEnumerable<ListarTipoReparacionDto>, IEnumerable<TipoReparacionModel>>(resultado.Hits);
        }
    }
}