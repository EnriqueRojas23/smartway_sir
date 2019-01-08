
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
    public class ListarUsuariosQuery : IQueryHandler<ListarUsuariosParameter>
    {
        public QueryResult Handle(ListarUsuariosParameter parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("usr_str_red", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.usr_str_red);
                parametros.Add("usr_str_nombre_apellido", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.usr_str_nombre_apellido);
                parametros.Add("rol_int_id", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.rol_int_id);

                var result = new ListarUsuariosResult();
                result.Hits = connection.Query<ListarUsuariosDto>(
                                    "seguridad.pa_listar_usuarios",
                                    parametros,
                                    commandType: CommandType.StoredProcedure );
                return result;
            }

        }
    }
}
