
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
    public class EncriptarPasswordQuery : IQueryHandler<EncriptarPasswordParameter>
    {
        public QueryResult Handle(EncriptarPasswordParameter parameters)
        {
            using (var connection = (SqlConnection)ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("pusr_int_id", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.usr_int_id);
                parametros.Add("pusr_str_clave", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.usr_str_password);

                var result = connection.Query<EncriptarPasswordResult>(
                                    "seguridad.pa_establecerClaveUsuario",
                                    parametros,
                                    commandType: CommandType.StoredProcedure).LastOrDefault();
                return result;
            }
        }
    }
}
