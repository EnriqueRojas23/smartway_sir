using Data.Common;
using QueryContracts.Common;
using QueryContracts.Smartway.Mantenimiento.Parameters;
using QueryContracts.Smartway.Mantenimiento.Results;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;
using System.Linq;

namespace QueryHandlers.Smartway.Mantenimiento
{
    public class ObtenerSucursalQuery : IQueryHandler<ObtenerSucursalParameter>
    {
        public QueryResult Handle(ObtenerSucursalParameter parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idsucursal", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idsucursal);

                var resultado = new ObtenerSucursalResult();
                resultado = connection.Query<ObtenerSucursalResult>
                        (
                            "mantenimiento.pa_obtenersucursal",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ).LastOrDefault();

                return resultado;
            }
        }
    }
}