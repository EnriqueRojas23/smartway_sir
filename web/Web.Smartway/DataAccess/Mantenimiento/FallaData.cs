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
    public class FallaData
    {

        public IEnumerable<FallaModel> listarFalla(int? idcategoriafalla, int? idfabricante)
        {
            var parametros = new ListarFallaParameters { idcategoriafalla = idcategoriafalla, idfabricante = idfabricante };
            var resultado = (ListarFallaResult)parametros.Execute();

            Mapper.CreateMap<ListarFallaDto, FallaModel>();
            return Mapper.Map<IEnumerable<ListarFallaDto>, IEnumerable<FallaModel>>(resultado.Hits);

        }
        public static IEnumerable<TipoFallaModel> GetListarTiposFalla()
        {

            var parametros = new ListarTipoFallaParameters {    };
            var resultado = (ListarTipoFallaResult)parametros.Execute();

            Mapper.CreateMap<ListarTipoFallaDto, TipoFallaModel>();
            return Mapper.Map<IEnumerable<ListarTipoFallaDto>, IEnumerable<TipoFallaModel>>(resultado.Hits);
        }
        public static IEnumerable<CategoriaFallaModel> GetListarCategoriaFalla()
        {
            var parametros = new ListarCategoriaFallaParameters { };
            var resultado = (ListarCategoriaFallaResult)parametros.Execute();

            Mapper.CreateMap<ListarCategoriaFallaDto, CategoriaFallaModel>();
            return Mapper.Map<IEnumerable<ListarCategoriaFallaDto>, IEnumerable<CategoriaFallaModel>>(resultado.Hits);
        }
        public int InsertarActualizarFalla (FallaModel model)
        {
            Mapper.CreateMap<FallaModel, InsertarActualizarFallaCommand>();
            var command = Mapper.Map<FallaModel, InsertarActualizarFallaCommand> (model);
            var result = (InsertarActualizarFallaOutput) command.Execute();
            return result.idfalla;
        }
    }
}