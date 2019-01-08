
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
    public class ObtenerDatosBasicosUsuarioQuery : IQueryHandler<ObtenerDatosBasicosUsuarioParameter>
    {
        public QueryResult Handle(ObtenerDatosBasicosUsuarioParameter parameters)
        {
            using (var connection = (SqlConnection)ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("usr_int_id", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.usr_int_id);
                parametros.Add("usr_str_red", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.usr_str_red);
                
                var result = connection.Query<ObtenerDatosBasicosUsuarioResult>(
                                    "seguridad.pa_obtener_datbas_usuario",
                                    parametros,
                                    commandType: CommandType.StoredProcedure).LastOrDefault();
                return result;
            }

        }
    }
}
