using Data.Common;
using QueryContracts.Common;
using QueryContracts.Smartway.Recepcion.Parameters;
using QueryContracts.Smartway.Recepcion.Results;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;

namespace QueryHandlers.Smartway.Recepcion
{
    public class ListarDocumentoRecepcionQuery : IQueryHandler<ListarDocumentoRecepcionParameters>
    {
        public QueryResult Handle(ListarDocumentoRecepcionParameters parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                //parametros.Add("idguiaremision", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idguiaremision);

                var resultado = new ListarDocumentoRecepcionResult
                {
                     Hits = connection.Query<ListarDocumentoRecepcionDto>
                        (
                            "recepcion.pa_listardocumentorecepcion",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };
                return resultado;
            }
        }
    }
}
