using Data.Common;
using QueryContracts.Common;
using QueryContracts.Smartway.Recepcion.Parameters;
using QueryContracts.Smartway.Reparacion.Results;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;

namespace QueryHandlers.Smartway.Recepcion
{
    public class ListarAlmacenQuery : IQueryHandler<ListarAlmacenParameters>
    {
        public QueryResult Handle(ListarAlmacenParameters parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idsucursal", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idsucursal);
                parametros.Add("codigoalmacen", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.codigoalmacen);

                var resultado = new ListarAlmacenResult
                {
                     Hits = connection.Query<ListarAlmacenDto>
                        (
                            "inventario.pa_listaralmacen",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };
                return resultado;
            }
        }
    }
}
