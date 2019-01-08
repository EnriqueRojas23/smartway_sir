

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
    public class BuscarPaginasQuery : IQueryHandler<BuscarPaginasParameter>
    {

        public QueryContracts.Common.QueryResult Handle(BuscarPaginasParameter parameters)
        {
            using (var connection = (SqlConnection)ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("pag_str_codmenu", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.pag_str_codmenu);
                parametros.Add("pag_str_nombre", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.pag_str_nombre);

                var result = new BuscarPaginasResult();
                result.Hits = connection.Query<BuscarPaginasDto>(
                                    "seguridad.pa_buscarpaginas",
                                    parametros,
                                    commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }
    }
}
