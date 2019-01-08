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
    public class ObtenerInventarioQuery : IQueryHandler<ObtenerInventarioParameters>
    {
        public QueryResult Handle(ObtenerInventarioParameters parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idalmacen", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idalmacen);
                //parametros.Add("imei", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.imei);
                //parametros.Add("serie", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.serie);
                parametros.Add("idproducto", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idproducto);
                parametros.Add("idinventario", dbType: DbType.Int64, direction: ParameterDirection.Input, value: parameters.idinventario);
                parametros.Add("idestado", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idestado);
                return connection.Query<ObtenerInventarioResult>
                    (
                         "inventario.pa_obtenerinventario"
                         , parametros
                         , commandType: CommandType.StoredProcedure
                    ).LastOrDefault();
            }
        }
    }
}

