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

    public class ObtenerNumeroIncidenciaQuery : IQueryHandler<ObtenerNumeroIncidenciaParameter>
    {
        public QueryResult Handle(ObtenerNumeroIncidenciaParameter parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();

                var resultado = new ObtenerNumeroIncidenciaResult();
                resultado = connection.Query<ObtenerNumeroIncidenciaResult>(
                        "agendamiento.obtenerNumeroIncidencia",
                        parametros,
                        commandType: CommandType.StoredProcedure).FirstOrDefault();

                return resultado;
            }
        }
    }
}

