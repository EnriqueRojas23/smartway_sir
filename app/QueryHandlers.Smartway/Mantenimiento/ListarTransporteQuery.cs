
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
    public class ListarTransporteQuery : IQueryHandler<ListarTransporteParameter>
    {
        public QueryResult Handle(ListarTransporteParameter parameters)
        {
            using (var connection = (SqlConnection)ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();

                parametros.Add("mot_int_id", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.mot_int_id);
                var resultado = new ListarTransporteResult
                {
                    Hits = connection.Query<ListarTransporteDto>
                        (
                            "delivery.pa_listarTransporte",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };

                return resultado;
            }
        }
    }
}
