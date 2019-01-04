namespace QueryHandlers.Smartway.Agendamiento.Incidencias
{

    using System.Data;
    using Data.Common;
    using QueryContracts.Common;
    using QueryHandlers.Common;
    using QueryContracts.Smartway.Agendamiento.Incidencias.Parameters;
    using QueryHandlers.Common.Dapper;
    using QueryContracts.Smartway.Agendamiento.Incidencias.Results;

    public class ListarIncidenciaQuery : IQueryHandler<ListarIncidenciaParameter>
    {
        public QueryResult Handle(ListarIncidenciaParameter parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("fechafin", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.fechafin);
                parametros.Add("fechainicio", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.fechainicio);
                parametros.Add("numerodocumento", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.numerodocumento);
                parametros.Add("numeroincidencia", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.numeroincidencia);

                var resultado = new ListarIncidenciaResult
                {
                    Hits = connection.Query<ListarIncidenciaDto>
                     (
                         "agendamiento.pa_listarincidencias",
                         parametros,
                         commandType: CommandType.StoredProcedure
                     ),
                };

                return resultado;

            
                
            }
        }
    }
}

