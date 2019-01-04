
using Data.Common;
using QueryContracts.Common;
using QueryContracts.Smartway.Seguridad.Parameters;
using QueryContracts.Smartway.Seguridad.Result;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;
using System.Data.SqlClient;

namespace QueryHandlers.Smartway.Seguridad
{
    public class ListarRolesQuery : IQueryHandler<ListarRolesParameter>
    {
        public QueryResult Handle(ListarRolesParameter parameters)
        {
            using (var connection = (SqlConnection)ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("rol_str_alias", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.rol_str_alias);

                var result = new ListarRolesResult();
                result.Hits = connection.Query<ListarRolesDto>(
                                    "seguridad.pa_listar_roles",
                                    parametros,
                                    commandType: CommandType.StoredProcedure);
                return result;
            }
        }
    }
}
