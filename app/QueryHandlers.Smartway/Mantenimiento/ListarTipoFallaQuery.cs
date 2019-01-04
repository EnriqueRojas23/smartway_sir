using Data.Common;
using QueryContracts.Common;
using QueryContracts.Smartway.Mantenimiento.Parameters;
using QueryContracts.Smartway.Mantenimiento.Results;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;

namespace QueryHandlers.Smartway.Mantenimiento
{
    public class ListarTipoFallaQuery : IQueryHandler<ListarTipoFallaParameters>
    {
        public QueryResult Handle(ListarTipoFallaParameters parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                var resultado = new ListarTipoFallaResult
                {
                     Hits = connection.Query<ListarTipoFallaDto>
                        (
                            "mantenimiento.pa_listartipofalla",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };
                return resultado;
            }
        }
    }
}
