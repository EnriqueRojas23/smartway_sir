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
    public class ObtenerProductoInventarioQuery : IQueryHandler<ObtenerProductoInventarioParameters>
    {
        public QueryResult Handle(ObtenerProductoInventarioParameters parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idproducto", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idproducto);
                parametros.Add("imei", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.imei);
                parametros.Add("serie", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.serie);

                return connection.Query<ObtenerProductoInventarioResult>
                    (
                         "inventario.pa_obtenerproductoinventario"
                         , parametros
                         , commandType: CommandType.StoredProcedure
                    ).LastOrDefault();
            }
        }
    }
}
