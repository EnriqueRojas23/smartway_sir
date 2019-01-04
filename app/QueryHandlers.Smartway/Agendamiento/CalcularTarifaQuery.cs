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

    public class CalcularTarifaQuery : IQueryHandler<CalcularTarifaParameter>
    {
        public QueryResult Handle(CalcularTarifaParameter parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idtipoproducto", dbType: DbType.Int64, direction: ParameterDirection.Input, value: parameters.idtipoproducto);
                parametros.Add("idnivelreparacion", dbType: DbType.Int64, direction: ParameterDirection.Input, value: parameters.idnivelreparacion);
                parametros.Add("idpartner", dbType: DbType.Int64, direction: ParameterDirection.Input, value: parameters.idpartner);

                var resultado = new CalcularTarifaResult();
                resultado = connection.Query<CalcularTarifaResult>(
                        "agendamiento.pa_calculartarifa",
                        parametros,
                        
                        commandType: CommandType.StoredProcedure).FirstOrDefault();

                return resultado;
            }
        }
    }
}

