

using Data.Common;
using QueryContracts.Common;
using QueryContracts.Smartway.Facturacion.Parameters;
using QueryContracts.Smartway.Facturacion.Results;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
namespace QueryHandlers.Smartway.Facturacion
{
    public class ObtenerComprobanteQuery : IQueryHandler<ObtenerComprobanteParameters>
    {

        public QueryResult Handle(ObtenerComprobanteParameters parameters)
        {                         
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("numerocomprobante", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.numerocomprobante);
                parametros.Add("idcomprobante", dbType: DbType.Int64, direction: ParameterDirection.Input, value: parameters.idcomprobante);

                var resultado = new ObtenerComprobanteResult();
                resultado = connection.Query<ObtenerComprobanteResult>
                    (
                        "facturacion.pa_obtenercomprobante",
                        parametros,
                        commandType: CommandType.StoredProcedure
                    ).LastOrDefault();

                return resultado;
            }
        }
    }
}
