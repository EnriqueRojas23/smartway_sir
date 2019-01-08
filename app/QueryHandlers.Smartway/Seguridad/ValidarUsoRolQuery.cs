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
    public class ValidarUsoRolQuery : IQueryHandler<ValidarUsoRolParameter>
    {

        public QueryContracts.Common.QueryResult Handle(ValidarUsoRolParameter parameters)
        {
            using (var connection = (SqlConnection)ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("rol_int_id", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.IdRol);

                var resultado = new ValidarUsoRolResult();
                resultado = connection.Query<ValidarUsoRolResult>
                        (
                            "seguridad.pa_validarUsoRol",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ).LastOrDefault();
                return resultado;
            }
        }
    }
}
