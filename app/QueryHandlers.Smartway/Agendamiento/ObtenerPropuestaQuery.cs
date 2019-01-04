namespace QueryHandlers.Smartway.Agendamiento.Incidencias
{
    using System.Data;
    using Data.Common;
    using QueryContracts.Common;
    using System.Linq;
    using QueryHandlers.Common;
    using QueryContracts.Smartway.Agendamiento.Incidencias.Parameters;
    using QueryHandlers.Common.Dapper;
    using QueryContracts.Smartway.Agendamiento.Incidencias.Results;

    public class ObtenerPropuestaQuery : IQueryHandler<ObtenerPropuestaParameter>
    {
        public QueryResult Handle(ObtenerPropuestaParameter parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idpropuesta", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idpropuesta);
                var resultado = new ObtenerPropuestaResult();
                resultado = connection.Query<ObtenerPropuestaResult>(
                        "agendamiento.pa_obtenerpropuesta",
                        parametros,
                        commandType: CommandType.StoredProcedure).FirstOrDefault();

                return resultado;
            }
        }
    }
}

