

using Data.Common;
using QueryContracts.Common;
using QueryContracts.TYS.Facturacion.Parameters;
using QueryContracts.TYS.Facturacion.Results;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;
using System.Data.SqlClient;
namespace QueryHandlers.TYS.Facturacion
{
    public class ListarDocumentosQuery : IQueryHandler<ListarDocumentosParameters>
    {
        public QueryResult Handle(ListarDocumentosParameters parameters)
        {
            using (var connection = (SqlConnection)ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idtipocomprobante", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.idtipocomprobante);

                var resultado = new ListarDocumentosResult
                {
                    Hits = connection.Query<ListarDocumentosDto>
                        (
                            "facturacion.pa_listardocumentos",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };
                return resultado;
            }
        }
    }
}
