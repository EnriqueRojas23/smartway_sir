namespace QueryHandlers.Coolbox.CIC.Incidencias
{
    using System.Data;
    using Data.Common;
    using QueryContracts.Common;
    using QueryContracts.Smartway.Agendamiento.Incidencias.Parameters;
    using QueryContracts.Smartway.Agendamiento.Incidencias.Results;
    using QueryHandlers.Common;
    using QueryHandlers.Common.Dapper;

    public class ListarPropuestasQuery : IQueryHandler<ListarPropuestasParameter>
    {
        public QueryResult Handle(ListarPropuestasParameter parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                var resultado = new ListarPropuestasResult
                {
                    Hits = connection.Query<ListarPropuestasDto>
                        (
                            "agendamiento.pa_listarpropuestas",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };
                return resultado;
            }
        }
    }
}

