namespace QueryHandlers.Smartway.Reparacion.OrdenTrabajo
{

    using System.Data;
    using System.Data.SqlClient;
    using Data.Common;
    using QueryContracts.Common;
    using System.Linq;
    using QueryHandlers.Common;
    using QueryHandlers.Common.Dapper;
    using QueryContracts.Smartway.Reparacion.Results;
    using QueryContracts.Smartway.Reparacion.Parameters;

    public class ObtenerUltimaOrdenTrabajoQuery : IQueryHandler<ObtenerUltimaOrdenTrabajoParameter>
    {
        public QueryResult Handle(ObtenerUltimaOrdenTrabajoParameter parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                var resultado = new ObtenerUltimaOrdenTrabajoResult();
                resultado = connection.Query<ObtenerUltimaOrdenTrabajoResult>(
                        "reparacion.pa_obtenerultimaordentrabajo",
                        parametros,
                        commandType: CommandType.StoredProcedure).FirstOrDefault();

                return resultado;
            }
        }
    }
}

