
using Data.Common;
using QueryContracts.Common;
using QueryContracts.Smartway.Seguridad.Parameters;
using QueryContracts.Smartway.Seguridad.Result;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
namespace QueryHandlers.Smartway.Seguridad
{
    public class CambiarContrasenaQuery : IQueryHandler<CambiarContrasenaParameter>
    {
        public QueryResult Handle(CambiarContrasenaParameter parameters)
        {
            using (var connection = (SqlConnection)ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("usr_int_id", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.IdUsuario);
                parametros.Add("password", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.password);

                var resultado = new CambiarContrasenaResult();
                resultado = connection.Query<CambiarContrasenaResult>
                        (
                            "seguridad.pa_cambiarcontrasena",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ).LastOrDefault();
                return resultado;
            }
        }
    }
}
