using Data.Common;
using QueryContracts.Common;
using QueryContracts.Smartway.Inventario.Parameters;
using QueryContracts.Smartway.Inventario.Results;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;

namespace QueryHandlers.Smartway.Recepcion
{
    public class ListarInventarioxAlmacenQuery : IQueryHandler<ListarInventarioxAlmacenParameters>
    {
        public QueryResult Handle(ListarInventarioxAlmacenParameters parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idalmacen", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idalmacen);
                parametros.Add("imei", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.imei);
                parametros.Add("serie", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.serie);
                parametros.Add("idproducto", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idproducto);

                var resultado = new ListarInventarioxAlmacenResult
                {
                     Hits = connection.Query<ListarInventarioxAlmacenDto>
                        (
                            "inventario.pa_listarinventarioxalmacen",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };
                return resultado;
            }
        }
    }
}
