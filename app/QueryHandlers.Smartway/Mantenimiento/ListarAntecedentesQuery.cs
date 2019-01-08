namespace QueryHandlers.Smartway.Mantenimiento.Query
{
    using System.Data;
    using Data.Common;
    using QueryContracts.Common;
    using QueryHandlers.Common;
    using QueryHandlers.Common.Dapper;
    using System.Linq;
    using QueryContracts.Smartway.Mantenimiento.Parameters;
    using QueryContracts.Smartway.Mantenimiento.Results;

    public class ListarAntecedentesQuery : IQueryHandler<ListarAntecedentesParameter>
    {
        public QueryResult Handle(ListarAntecedentesParameter parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idincidencia", dbType: DbType.Int64, direction: ParameterDirection.Input, value: parameters.idincidencia);

                var result = new ListarAntecedentesResult();

                var multiquery =  connection.QueryMultiple
                (
                    "agendamiento.pa_obtenerantecedentesincidencia",
                    parametros,
                    commandType: CommandType.StoredProcedure
                );
                result.Productos = multiquery.Read<ListarAntecedentesIncidenteDto>().ToList();
                result.Clientes = multiquery.Read<ListarAntecedentesIncidenteDto>().ToList();
                


                return result;

            }
        }
    }
}

