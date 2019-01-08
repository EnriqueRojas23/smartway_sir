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
    public class TarifasData
    {
        public static IEnumerable<TarifaModel> GetListarTarifas(int idpartner)
        {

            var parametros = new ListarTarifaParameters { idpartner = idpartner };
            var resultado = (ListarTarifaResult)parametros.Execute();

            Mapper.CreateMap<ListarTarifaDto, TarifaModel>();
            return Mapper.Map<IEnumerable<ListarTarifaDto>, IEnumerable<TarifaModel>>(resultado.Hits);

        }
        public int InsertarActualizarTarifa (TarifaModel model)
        {
            Mapper.CreateMap<TarifaModel, InsertarActualizarTarifaCommand>();
            var command = Mapper.Map<TarifaModel, InsertarActualizarTarifaCommand> (model);
            var result = (InsertarActualizarTarifaOutput) command.Execute();
            return result.idtarifa;
        }
    }
}