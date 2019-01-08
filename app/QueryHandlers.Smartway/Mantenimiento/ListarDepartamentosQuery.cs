
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
    public class ListarDepartamentosQuery : IQueryHandler<ListarDepartamentoParameters>
    {

        public QueryResult Handle(ListarDepartamentoParameters parameters)
        {
            using (var connection = (SqlConnection)ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();


                var resultado = new ListarDepartamentosResult
                {
                    Hits = connection.Query<ListarDepartamentosDto>
                        (
                            "mantenimiento.pa_listardepartamento",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };

                return resultado;
            }
        }
    }
}
