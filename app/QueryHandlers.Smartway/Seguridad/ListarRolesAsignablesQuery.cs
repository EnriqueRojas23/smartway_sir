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
    public class ListarRolesAsignablesQuery : IQueryHandler<ListarRolesAsignablesParameter>
    {
        public QueryResult Handle(ListarRolesAsignablesParameter parameters)
        {
            using (var connection = (SqlConnection)ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("usr_str_red", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.usr_str_red);
                parametros.Add("sis_str_siglas", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.sis_str_siglas);
                parametros.Add("rol_str_alias", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.rol_str_alias);
                parametros.Add("int_rol_sin_asignar", dbType: DbType.Int16, direction: ParameterDirection.Input, value: parameters.int_rol_sin_asignar);

                var result = new ListarRolesAsignablesResult();
                result.Hits = connection.Query<ListarRolesAsignablesDto>(
                                    "seguridad.pa_listar_roles_asignables",
                                    parametros,
                                    commandType: CommandType.StoredProcedure);
                return result;
            }
        }
    }
}
