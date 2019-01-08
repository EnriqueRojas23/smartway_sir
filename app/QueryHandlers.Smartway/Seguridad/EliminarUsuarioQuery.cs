using Data.Common;
using QueryContracts.Common;
using QueryContracts.Smartway.Account.Parameters;
using QueryContracts.Smartway.Account.Results;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;
using System.Data.SqlClient;
using System.Linq;


using QueryContracts.Smartway.Seguridad.Parameters;
using QueryContracts.Smartway.Seguridad.Result;

namespace QueryHandlers.Smartway.Seguridad
{
    public class EliminarUsuarioQuery : IQueryHandler<EliminarUsuarioParameter>
    {

        public QueryContracts.Common.QueryResult Handle(EliminarUsuarioParameter parameters)
        {
            using (var connection = (SqlConnection)ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("usr_int_id", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.IdUsuario);

                var resultado = new EliminarUsuarioResult();
                resultado = connection.Query<EliminarUsuarioResult>
                        (
                            "seguridad.pa_eliminarusuario",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ).LastOrDefault();
                return resultado;
            }
        }
    }
}
