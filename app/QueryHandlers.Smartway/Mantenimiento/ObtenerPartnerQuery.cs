
using Data.Common;
using QueryContracts.Common;
using QueryContracts.Smartway.Mantenimiento.Parameters;
using QueryContracts.Smartway.Mantenimiento.Results;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
namespace QueryHandlers.Smartway.Mantenimiento
{
    public class ObtenerPartnerQuery : IQueryHandler<ObtenerPartnerParameter>
    {

        public QueryResult Handle(ObtenerPartnerParameter parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idpartner", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idpartner);

                var resultado = new ObtenerPartnerResult();
                resultado = connection.Query<ObtenerPartnerResult>
                        (
                            "mantenimiento.pa_obtenerpartner",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ).LastOrDefault();

                return resultado;
            }
        }
    }
}
