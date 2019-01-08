using Data.Common;
using QueryContracts.Common;
using QueryContracts.Smartway.Account.Parameters;
using QueryContracts.Smartway.Account.Results;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;
using System.Data.SqlClient;
using System.Linq;


namespace QueryHandlers.Smartway.Seguridad
{
    public class ObtenerUsuarioQuery1 : IQueryHandler<ObtenerUsuarioParameter1>
    {
        public QueryResult Handle(ObtenerUsuarioParameter1 parameters)
        {
            using (var connection = (SqlConnection)ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("usr_int_id", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.Usr_int_id);

                var resultado = new ObtenerUsuarioResult1();
                resultado = connection.Query<ObtenerUsuarioResult1>
                        (
                            "seguridad.pa_obtenerUsuario_1",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ).LastOrDefault();
                return resultado;
            }
        }
    }
}
