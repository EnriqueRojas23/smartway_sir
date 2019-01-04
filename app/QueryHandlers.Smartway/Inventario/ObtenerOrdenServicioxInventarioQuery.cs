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
    public class ObtenerOrdenServicioxInventarioQuery : IQueryHandler<ObtenerOrdenServicioxInventarioParameters>
    {
        public QueryResult Handle(ObtenerOrdenServicioxInventarioParameters parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idinventario", dbType: DbType.Int64, direction: ParameterDirection.Input, value: parameters.idinventario);
                return connection.Query<ObtenerOrdenServicioxInventarioResult>
                    (
                         "inventario.pa_obtenerOrdenservicioxInventario"
                         , parametros
                         , commandType: CommandType.StoredProcedure
                    ).LastOrDefault();
            }
        }
    }
}

