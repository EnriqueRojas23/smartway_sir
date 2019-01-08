
using Data.Common;
using QueryContracts.Smartway.Seguridad.Parameters;
using QueryContracts.Smartway.Seguridad.Result;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
namespace QueryHandlers.Smartway.Seguridad
{
    public class ListarPaginasPadreQuery : IQueryHandler<ListarPaginasPadreParameter>
    {
        public QueryContracts.Common.QueryResult Handle(ListarPaginasPadreParameter parameters)
        {
            using (var connection = (SqlConnection)ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();

                var result = new ListarPaginasPadreResult();
                result.Hits = connection.Query<ListarPaginasPadreDto>(
                                    "seguridad.pa_buscarpaginas_sistemas",
                                    parametros,
                                    commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }
    }
}
