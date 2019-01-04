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

    public class ObtenerOrdenServicioQuery : IQueryHandler<ObtenerOrdenServicioParameter>
    {
        public QueryResult Handle(ObtenerOrdenServicioParameter parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idordenservicio", dbType: DbType.Int64, direction: ParameterDirection.Input, value: parameters.idordenservicio);
                var resultado = new ObtenerOrdenServicioResult();
                resultado = connection.Query<ObtenerOrdenServicioResult>(
                        "agendamiento.pa_obtenerordenservicio",
                        parametros,
                        commandType: CommandType.StoredProcedure).FirstOrDefault();

                return resultado;
            }
        }
    }
}

