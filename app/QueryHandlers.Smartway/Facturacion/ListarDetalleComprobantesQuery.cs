

using Data.Common;
using QueryContracts.Common;
using QueryContracts.Smartway.Facturacion.Parameters;
using QueryContracts.Smartway.Facturacion.Results;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;
namespace QueryHandlers.Smartway.Facturacion
{
    public class ListarDetalleComprobantesQuery : IQueryHandler<ListarDetalleComprobantesParameters>
    {
        public QueryResult Handle(ListarDetalleComprobantesParameters parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("iddocumentocompra", dbType: DbType.Int64, direction: ParameterDirection.Input, value: parameters.iddocumentocompra);
                parametros.Add("serie", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.serie);

                var resultado = new ListarDetalleComprobantesResult
                {
                    Hits = connection.Query<ListarDetalleComprobantesDto>
                        (
                            "facturacion.pa_listardetallecomprobante",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };
                return resultado;
            }
        }
    }
}
