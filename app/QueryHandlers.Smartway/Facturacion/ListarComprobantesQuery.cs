

using Data.Common;
using QueryContracts.Common;
using QueryContracts.Smartway.Facturacion.Parameters;
using QueryContracts.Smartway.Facturacion.Results;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;
namespace QueryHandlers.Smartway.Facturacion
{
    public class ListarComprobantesQuery : IQueryHandler<ListarComprobantesParameters>
    {
        public QueryResult Handle(ListarComprobantesParameters parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idcliente", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idcliente);
                parametros.Add("idestado", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idestado);
                parametros.Add("idtipocomprobante", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idtipocomprobante);
                parametros.Add("numerocomprobante", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.numerocomprobante);

                var resultado = new ListarComprobantesResult
                {
                    Hits = connection.Query<ListarComprobantesDto>
                        (
                            "facturacion.pa_listarcomprobante2",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };
                return resultado;
            }
        }
    }
}
