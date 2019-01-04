namespace QueryHandlers.Smartway.Agendamiento.Incidencias
{

    using System.Data;
    using System.Data.SqlClient;
    using Data.Common;
    using QueryContracts.Common;
    using System.Linq;
    using QueryHandlers.Common;
    using QueryContracts.Smartway.Agendamiento.Incidencias.Parameters;
    using QueryHandlers.Common.Dapper;
    using QueryContracts.Smartway.Agendamiento.Incidencias.Results;

    public class ObtenerIncidenciaQuery : IQueryHandler<ObtenerIncidenciaParameter>
    {
        public QueryResult Handle(ObtenerIncidenciaParameter parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idincidencia", dbType: DbType.Int64, direction: ParameterDirection.Input, value: parameters.idincidencia);
                var resultado = new ObtenerIncidenciaResult();
                resultado = connection.Query<ObtenerIncidenciaResult>(
                        "agendamiento.pa_obtenerincidencia",
                        parametros,
                        commandType: CommandType.StoredProcedure).FirstOrDefault();

                return resultado;
            }
        }
    }
}

