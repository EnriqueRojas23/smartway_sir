

using Data.Common;
using QueryContracts.Common;
using QueryContracts.Smartway.Account.Parameters;
using QueryContracts.Smartway.Account.Results;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;
using System.Data.SqlClient;
using System.Linq;


namespace QueryHandlers.Smartway.Account
{
    public class ObtenerUsuarioQuery : IQueryHandler<ObtenerUsuarioParameter>
    {
        public QueryResult Handle(ObtenerUsuarioParameter parameters)
        {
            using (var connection = (SqlConnection)ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("pusr_str_red", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.Usr_str_red);
                parametros.Add("pusr_int_id", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.Usr_int_id);

                var parametros2 = new DynamicParameters();
                parametros2.Add("usr_str_red", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.Usr_str_red);


                var resultado = connection.Query<ObtenerUsuarioResult>
                  (
                      "seguridad.pa_obtenerusuario",
                       parametros,
                       commandType: CommandType.StoredProcedure
                  ).LastOrDefault();    


                if (resultado != null && resultado.Rol_int_id.HasValue == true)
                {
                    resultado.ListaRoles = connection.Query<RolDto>
                       (
                           "seguridad.pa_listar_roles_por_usuario",
                            parametros2,
                            commandType: CommandType.StoredProcedure
                       );

                }

                return resultado;
            }
        }
    }
}
