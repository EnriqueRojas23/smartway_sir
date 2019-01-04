namespace QueryHandlers.Coolbox.CIC.Incidencias
{
    using System.Data;
    using Data.Common;
    using QueryContracts.Common;
    using QueryContracts.Smartway.Agendamiento.Incidencias.Parameters;
    using QueryContracts.Smartway.Agendamiento.Incidencias.Results;
    using QueryHandlers.Common;
    using QueryHandlers.Common.Dapper;

    public class ListarPropuestasSolucionQuery : IQueryHandler<ListarPropuestasSolucionParameter>
    {
        public QueryResult Handle(ListarPropuestasSolucionParameter parameters)
        {
            using (var connection =ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idtipogarantia", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idtipogarantia);
                var resultado = new ListarPropuestasSolucionResult
                {
                    Hits = connection.Query<ListarPropuestasSolucionDto>
                        (
                            "agendamiento.pa_listarpropuestasolucion",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };
                return resultado;
            }
        }
    }
}

