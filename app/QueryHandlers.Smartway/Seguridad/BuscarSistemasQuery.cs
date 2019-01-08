

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
    public class BuscarSistemasQuery : IQueryHandler<BuscarSistemasParameter>
    {
        public QueryResult Handle(BuscarSistemasParameter parameters)
        {
            using (var connection = (SqlConnection)ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("nombre", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.nombre);
                parametros.Add("alias", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.alias);

                var result = new BuscarSistemasResult();
                result.Hits = connection.Query<BuscarSistemasDto>(
                                    "seguridad.pa_buscarsistemas",
                                    parametros,
                                    commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }
    }
}
