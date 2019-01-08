using Data.Common;
using QueryContracts.Common;
using QueryContracts.Common.Seguridad.Parameters;
using QueryContracts.Common.Seguridad.Results;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;
using System.Data.SqlClient;


namespace QueryHandlers.Common.Seguridad
{
    public class ListarMenusxRolesQuery : IQueryHandler<ListarMenusxRolesParameter>
    {
        public QueryResult Handle(ListarMenusxRolesParameter parameters)
        {
            using (var connection = (SqlConnection)ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("rol_int_id", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.rol_int_id);
                parametros.Add("sis_str_siglas", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.sis_str_siglas);

                var result = new ListarMenusxRolesResult();
                result.Hits = connection.Query<ListarMenusxRolesDto>(
                                    "seguridad.pa_listar_menus",
                                    parametros,
                                    commandType: CommandType.StoredProcedure);
                return result;
            }
        }
    }
}
