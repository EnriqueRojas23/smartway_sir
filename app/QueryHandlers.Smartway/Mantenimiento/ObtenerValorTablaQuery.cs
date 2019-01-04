
using Data.Common;
using QueryContracts.Common;
using QueryContracts.Smartway.Mantenimiento.Parameters;
using QueryContracts.Smartway.Mantenimiento.Results;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
namespace QueryHandlers.Smartway.Mantenimiento
{
    public class ObtenerValorTablaQuery : IQueryHandler<ObtenerValorTablaParameter>
    {

        public QueryResult Handle(ObtenerValorTablaParameter parameters)
        {
            using (var connection = (SqlConnection)ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idvalortabla", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idvalortabla);

                var resultado = new ObtenerValorTablaResult();
                resultado = connection.Query<ObtenerValorTablaResult>
                        (
                            "mantenimiento.pa_obtenervalortabla",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ).LastOrDefault();

                return resultado;
            }
        }
    }
}
