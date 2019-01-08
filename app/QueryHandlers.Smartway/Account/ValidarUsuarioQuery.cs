

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
    public class ValidarUsuarioQuery : IQueryHandler<ValidarUsuarioParameter>
    {
        public QueryResult Handle(ValidarUsuarioParameter parameters)
        {
            using (var connection = (SqlConnection)ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("usr_str_red", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.Usr_str_red);
                parametros.Add("usr_str_password", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.Usr_str_password);

                var resultado = new ValidarUsuarioResult();
                resultado = connection.Query<ValidarUsuarioResult>
                        (
                            "seguridad.sp_validarusuario",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ).LastOrDefault();

                return resultado;
            }
        }
    }
}
