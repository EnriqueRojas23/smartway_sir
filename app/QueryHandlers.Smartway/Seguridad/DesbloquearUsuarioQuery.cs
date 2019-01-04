

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
    public class DesbloquearUsuarioQuery : IQueryHandler<DesbloquearUsuarioParameter>
    {


        public QueryResult Handle(DesbloquearUsuarioParameter parameters)
        {
            using (var connection = (SqlConnection)ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("usr_int_id", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.id);

                var result = connection.Query<DesbloquearUsuarioResult>(
                                    "seguridad.pa_desbloquearusuario",
                                    parametros,
                                    commandType: CommandType.StoredProcedure).LastOrDefault(); 
                return result;
            }
        }
    }
}
