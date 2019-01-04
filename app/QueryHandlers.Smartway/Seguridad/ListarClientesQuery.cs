

using Data.Common;
using QueryContracts.Neptunia.Seguridad.Parameters;
using QueryContracts.Neptunia.Seguridad.Result;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;
using System.Data.SqlClient;
using System.Linq;


namespace QueryHandlers.Neptunia.Seguridad
{
    public class ListarClientesQuery : IQueryHandler<ListarClientesParameter>
    {


        public QueryContracts.Common.QueryResult Handle(ListarClientesParameter parameters)
        {
            using (var connection = (SqlConnection)ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                var result = new ListarClientesResult();
                result.Hits = connection.Query<ListarClientesDto>(
                                    "seguridad.pa_listarclientes",
                                    parametros,
                                    commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }
    }
}
