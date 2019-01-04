namespace QueryHandlers.Coolbox.CIC.Incidencias
{
    using System.Data;
    using Data.Common;
    using QueryContracts.Common;
    using QueryContracts.Smartway.Agendamiento.Incidencias.Parameters;
    using QueryContracts.Smartway.Agendamiento.Incidencias.Results;
    using QueryHandlers.Common;
    using QueryHandlers.Common.Dapper;

    public class ListarIncidenciaEvaluacionQuery : IQueryHandler<ListarIncidenciaEvaluacionParameter>
    {
        public QueryResult Handle(ListarIncidenciaEvaluacionParameter parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idincidencia", dbType: DbType.Int64, direction: ParameterDirection.Input, value: parameters.idincidencia);
                var resultado = new ListarIncidenciaEvaluacionResult
                {
                    Hits = connection.Query<ListarIncidenciaEvaluacionDto>
                        (
                            "agendamiento.pa_listarincidenciaevaluacion",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };
                return resultado;
            }
        }
    }
}

