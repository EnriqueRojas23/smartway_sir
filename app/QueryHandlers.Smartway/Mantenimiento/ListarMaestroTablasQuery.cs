
using Data.Common;
using QueryContracts.Common;
using QueryContracts.Smartway.Mantenimiento.Parameters;
using QueryContracts.Smartway.Mantenimiento.Results;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;
using System.Data.SqlClient;
namespace QueryHandlers.Smartway.Mantenimiento
{
    public class ListarMaestroTablasQuery : IQueryHandler<ListarMaestroTablasParameters>
    {

        public QueryResult Handle(ListarMaestroTablasParameters parameters)
        {
            using (var connection = (SqlConnection)ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();

                var resultado = new ListarMaestroTablasResult
                {
                    Hits = connection.Query<ListarMaestroTablasDto>
                        (
                            "mantenimiento.pa_listarmaestrotabla",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };

                return resultado;
            }
        }
    }
}
