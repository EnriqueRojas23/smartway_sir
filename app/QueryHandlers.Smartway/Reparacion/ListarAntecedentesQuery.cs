namespace QueryHandlers.Smartway.Reparacion.Query
{
    using System.Data;
    using Data.Common;
    using QueryContracts.Common;
    using QueryHandlers.Common;
    using QueryHandlers.Common.Dapper;
    using System.Linq;
    using QueryContracts.Smartway.Reparacion.Parameters;
    using QueryContracts.Smartway.Reparacion.Results;

    public class ListarAntecedentesQuery : IQueryHandler<ListarAntecedentesParameter>
    {
        public QueryResult Handle(ListarAntecedentesParameter parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idordenservicio", dbType: DbType.Int64, direction: ParameterDirection.Input, value: parameters.idordenservicio);
                var result = new ListarAntecedentesResult();
                var multiquery =  connection.QueryMultiple
                (
                    "reparacion.pa_obtenerantecedentesordenservicio_telecom",
                    parametros,
                    commandType: CommandType.StoredProcedure
                );
                result.Historico = multiquery.Read<ListarAntecedentesOrdenServicioDto>().ToList();
                return result;

            }
        }
    }
}

