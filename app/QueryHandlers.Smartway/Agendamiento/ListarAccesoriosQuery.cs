namespace QueryHandlers.Smartway.Agendamiento.Incidencias
{

    using System.Data;
    using Data.Common;
    using QueryContracts.Common;
    using QueryHandlers.Common;
    using QueryHandlers.Common.Dapper;
    using QueryContracts.Smartway.Agendamiento.Incidencias.Parameters;
    using QueryContracts.Smartway.Agendamiento.Incidencias.Results;

    public class ListarAccesoriosQuery : IQueryHandler<ListarAccesoriosParameter>
    {
        public QueryResult Handle(ListarAccesoriosParameter parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                var resultado = new ListarAccesoriosResult
                {
                    Hits = connection.Query<ListarAccesoriosDto>
                        (
                            "agendamiento.pa_listaraccesoriosproducto",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };
                return resultado;

            }
        }
    }
}

