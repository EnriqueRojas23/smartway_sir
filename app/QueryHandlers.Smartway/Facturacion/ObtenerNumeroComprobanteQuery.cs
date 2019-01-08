

using Data.Common;
using QueryContracts.Common;
using QueryContracts.TYS.Facturacion.Parameters;
using QueryContracts.TYS.Facturacion.Results;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
namespace QueryHandlers.TYS.Facturacion
{
    public class ObtenerNumeroComprobanteQuery : IQueryHandler<ObtenerNumeroComprobanteParameters>
    {

        public QueryResult Handle(ObtenerNumeroComprobanteParameters parameters)
        {                         
            using (var connection = (SqlConnection)ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idestacion", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idestacionorigen);
                parametros.Add("idtipocomprobante", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idtipocomprobante);
                parametros.Add("idusuario", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idusuario);

                var resultado = new ObtenerNumeroComprobanteResult();
                resultado = connection.Query<ObtenerNumeroComprobanteResult>
                    (
                        "facturacion.pa_obtenernumerodocumento",
                        parametros,
                        commandType: CommandType.StoredProcedure
                    ).LastOrDefault();

                return resultado;
            }
        }
    }
}
