namespace QueryHandlers.Smartway.Agendamiento.Incidencias
{

    using System.Data;
    using Data.Common;
    using QueryContracts.Common;
    using QueryHandlers.Common;
    using QueryContracts.Smartway.Agendamiento.Incidencias.Parameters;
    using QueryHandlers.Common.Dapper;
    using QueryContracts.Smartway.Agendamiento.Incidencias.Results;

    public class ListarCondicionesQuery : IQueryHandler<ListarCondicionesParameter>
    {
        public QueryResult Handle(ListarCondicionesParameter parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();


                var resultado = new ListarCondicionesResult
                {
                    Hits = connection.Query<ListarCondicionesDto>
                     (
                         "agendamiento.pa_listarcondiciones",
                         parametros,
                         commandType: CommandType.StoredProcedure
                     ),
                };

                return resultado;

            
                
            }
        }
    }
}

