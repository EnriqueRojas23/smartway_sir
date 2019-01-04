
using Data.Common;
using QueryContracts.Common;
using QueryContracts.Coolbox.Rol.Parameters;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;
using System.Data.SqlClient;

namespace QueryHandlers.Coolbox.Seguridad
{
    public class ListarRolQuery : IQueryHandler<ListarRolParameter>
    {
        public QueryResult Handle(ListarRolParameter parameters)
        {
            using (var connection = (SqlConnection)ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();

                parametros.Add("rol_str_descrip", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.rol_str_descrip);
                var resultado = new ListarRolResult
                {
                    Hits = connection.Query<ListarRolDto>
                        (
                            "seguridad.pa_listarRoles",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };

                return resultado;
            }
        }
    }
}
