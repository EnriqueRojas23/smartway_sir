namespace QueryHandlers.Smartway.Agendamiento.Incidencias
{

    using System.Data;
    using Data.Common;
    using QueryContracts.Common;
    using QueryHandlers.Common;
    using QueryContracts.Smartway.Agendamiento.Incidencias.Parameters;
    using QueryHandlers.Common.Dapper;
    using QueryContracts.Smartway.Agendamiento.Incidencias.Results;

    public class ListarIncidenciaCotizacionQuery : IQueryHandler<ListarIncidenciaCotizacionParameter>
    {
        public QueryResult Handle(ListarIncidenciaCotizacionParameter parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idincidencia", dbType: DbType.Int64, direction: ParameterDirection.Input, value: parameters.idincidencia);


                var resultado = new ListarIncidenciaCotizacionResult
                {
                    Hits = connection.Query<ListarIncidenciaCotizacionDto>
                     (
                         "agendamiento.pa_listarcotizacionincidencia",
                         parametros,
                         commandType: CommandType.StoredProcedure
                     ),
                };

                return resultado;

            
                
            }
        }
    }
}

