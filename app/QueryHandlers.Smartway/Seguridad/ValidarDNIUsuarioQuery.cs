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
    public class ValidarDNIUsuarioQuery : IQueryHandler<ValidarDNIUsuarioParameter>
    {

        public QueryContracts.Common.QueryResult Handle(ValidarDNIUsuarioParameter parameters)
        {
            using (var connection = (SqlConnection)ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("usr_str_dni", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.usr_str_dni);

                var resultado = new ValidarDNIUsuarioResult();
                resultado = connection.Query<ValidarDNIUsuarioResult>
                        (
                            "seguridad.pa_validarDniUsuario",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ).LastOrDefault();
                return resultado;
            }
        }
    }
}
