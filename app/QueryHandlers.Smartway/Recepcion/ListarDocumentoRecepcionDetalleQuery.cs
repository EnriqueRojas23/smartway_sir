using Data.Common;
using QueryContracts.Common;
using QueryContracts.Smartway.Recepcion.Parameters;
using QueryContracts.Smartway.Recepcion.Results;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;

namespace QueryHandlers.Smartway.Recepcion
{
    public class ListarDocumentoRecepcionDetalleQuery : IQueryHandler<ListarDocumentoRecepcionDetalleParameters>
    {
        public QueryResult Handle(ListarDocumentoRecepcionDetalleParameters parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("iddocumentorecepcion", dbType: DbType.Int64, direction: ParameterDirection.Input, value: parameters.iddocumentorecepcion);

                var resultado = new ListarDocumentoRecepcionDetalleResult
                {
                     Hits = connection.Query<ListarDocumentoRecepcionDetalleDto>
                        (
                            "recepcion.pa_listardocumentorecepcion_detalle",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };
                return resultado;
            }
        }
    }
}
