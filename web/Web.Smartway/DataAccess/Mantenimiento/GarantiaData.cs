using AutoMapper;
using CommandContracts.Smartway.Mantenimiento;
using CommandContracts.Smartway.Mantenimiento.Output;
using QueryContracts.Smartway.Mantenimiento.Parameters;
using QueryContracts.Smartway.Mantenimiento.Results;
using ServiceAgents.Common;
using System.Collections.Generic;
using Web.Smartway.Areas.Mantenimiento.Models;

namespace Web.Smartway.DataAccess.Mantenimiento
{
    public  class GarantiaData
    {
        #region Tipogarantia

        public static IEnumerable<TipoGarantiaModel> listarTipoGarantia()
        {
            var parametros = new ListarTipoGarantiaParameters {   };
            var resultado = (ListarTipoGarantiaResult)parametros.Execute();

            Mapper.CreateMap<ListarTipoGarantiaDto, TipoGarantiaModel>();
            return Mapper.Map<IEnumerable<ListarTipoGarantiaDto>, IEnumerable<TipoGarantiaModel>>(resultado.Hits);
        }

        #endregion
        #region Garantia

        public static IEnumerable<GarantiaModel> listarGarantia(int idpartner)
        {
            var parametros = new ListarGarantiaParameters { idpartner = idpartner };
            var resultado = (ListarGarantiaResult)parametros.Execute();

            Mapper.CreateMap<ListarGarantiaDto, GarantiaModel>();
            return Mapper.Map<IEnumerable<ListarGarantiaDto>, IEnumerable<GarantiaModel>>(resultado.Hits);
        }

        public int insertarActualizarGarantia(GarantiaModel model)
        {
            Mapper.CreateMap<GarantiaModel, InsertarActualizarGarantiaCommand>();
            var comando = Mapper.Map<GarantiaModel, InsertarActualizarGarantiaCommand>(model);
            var respuesta = (InsertarActualizarGarantiaOutput)comando.Execute();
            return respuesta.idgarantia;
        }

        #endregion










    }
}