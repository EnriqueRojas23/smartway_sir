using Data.Common;
using QueryContracts.Common;
using QueryContracts.Smartway.Mantenimiento.Parameters;
using QueryContracts.Smartway.Mantenimiento.Results;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;

namespace QueryHandlers.Smartway.Mantenimiento
{
    public class ListarTipoReparacionQuery : IQueryHandler<ListarTipoReparacionParameters>
    {
        public QueryResult Handle(ListarTipoReparacionParameters parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                var resultado = new ListarTipoReparacionResult
                {
                     Hits = connection.Query<ListarTipoReparacionDto>
                        (
                            "mantenimiento.pa_listartiporeparacion",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };
                return resultado;
            }
        }
    }
}
