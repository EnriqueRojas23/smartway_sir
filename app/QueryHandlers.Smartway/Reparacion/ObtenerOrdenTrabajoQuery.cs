namespace QueryHandlers.Smartway.Agendamiento.Incidencias
{

    using System.Data;
    using System.Data.SqlClient;
    using Data.Common;
    using QueryContracts.Common;
    using System.Linq;
    using QueryHandlers.Common;
    using QueryHandlers.Common.Dapper;
    using QueryContracts.Smartway.Despacho.Parameters;
    using QueryContracts.Smartway.Reparacion.Results;

    public class ObtenerOrdenTrabajoQuery : IQueryHandler<ObtenerOrdenTrabajoParameter>
    {
        public QueryResult Handle(ObtenerOrdenTrabajoParameter parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idordentrabajo", dbType: DbType.Int64, direction: ParameterDirection.Input, value: parameters.idordentrabajo);
                var resultado = new ObtenerOrdenTrabajoResult();
                resultado = connection.Query<ObtenerOrdenTrabajoResult>(
                        "reparacion.pa_obtenerordentrabajo",
                        parametros,
                        commandType: CommandType.StoredProcedure).FirstOrDefault();

                return resultado;
            }
        }
    }
}

