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
                parametros.Add("fecini", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.fechahorainicio);
                parametros.Add("fecfin", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.fechahorafin);
                parametros.Add("numeroordenservicio", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.numeroordenservicio);

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
