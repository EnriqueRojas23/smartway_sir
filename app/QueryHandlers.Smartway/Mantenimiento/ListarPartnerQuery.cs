
using Data.Common;
using QueryContracts.Common;
using QueryContracts.Smartway.Mantenimiento.Parameters;
using QueryContracts.Smartway.Mantenimiento.Results;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;
using System.Data.SqlClient;
namespace QueryHandlers.Smartway.Mantenimiento
{
    public class ListarPartnerQuery : IQueryHandler<ListarPartnerParameters>
    {

        public QueryResult Handle(ListarPartnerParameters parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("numerodocumento", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.numerodocumento);
                parametros.Add("razonsocial", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.razonsocial);

                var resultado = new ListarPartnerResult
                {
                    Hits = connection.Query<ListarPartnerDto>
                        (
                            "mantenimiento.pa_listarpartner",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };

                return resultado;
            }
        }
    }
}
