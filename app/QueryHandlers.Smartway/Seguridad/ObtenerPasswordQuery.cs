
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
    public class ObtenerPasswordQuery : IQueryHandler<ObtenerPasswordParameter>
    {
        public QueryContracts.Common.QueryResult Handle(ObtenerPasswordParameter parameters)
        {
            using (var connection = (SqlConnection)ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("usr_str_email", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.usr_str_email);

                var resultado = new ObtenerPasswordResult();
                resultado = connection.Query<ObtenerPasswordResult>
                        (
                            "seguridad.pa_obtenerpassxmail",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ).LastOrDefault();
                return resultado;
            }
        }
    }
}
