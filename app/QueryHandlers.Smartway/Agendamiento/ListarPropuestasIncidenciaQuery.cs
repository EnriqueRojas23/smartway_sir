namespace QueryHandlers.Coolbox.CIC.Incidencias
{

    using System.Data;
    using System.Data.SqlClient;
    using Data.Common;
    using QueryContracts.Common;
    using QueryContracts.Coolbox.CIC.Incidencias.Parameters;
    using QueryContracts.Coolbox.CIC.Incidencias.Results;
    using QueryHandlers.Common;
    using QueryHandlers.Common.Dapper;
    using System.Linq;

    public class ListarPropuestasIncidenciaQuery : IQueryHandler<ListarPropuestasIncidenciaParameter>
    {
        public QueryResult Handle(ListarPropuestasIncidenciaParameter parameters)
        {
            using (var connection = (SqlConnection)ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("inc_int_id", dbType: DbType.Int64, direction: ParameterDirection.Input, value: parameters.inc_int_id);
                var resultado = new ListarPropuestasIncidenciaResult
                {
                    Hits = connection.Query<ListarPropuestasIncidenciaDto>
                        (
                            "cic.pa_listarPropuestasIncidencia",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };
                return resultado;

            }
        }
    }
}

