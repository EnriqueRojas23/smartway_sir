using Data.Common;
using QueryContracts.Common;
using QueryContracts.Smartway.Inventario.Parameters;
using QueryContracts.Smartway.Inventario.Results;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;
using System.Linq;
namespace QueryHandlers.Smartway.Inventario
{
    public class ObtenerAlmacenQuery : IQueryHandler<ObtenerAlmacenParameters>
    {
        public QueryResult Handle(ObtenerAlmacenParameters parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idalmacen", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idalmacen);
                parametros.Add("codalmacen", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.codigo);
                return connection.Query<ObtenerAlmacenResult>
                    (
                         "inventario.pa_obteneralmacen"
                         , parametros
                         , commandType: CommandType.StoredProcedure
                    ).LastOrDefault();
            }
        }
    }
}
