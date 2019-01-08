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

    public class ListarAntecedentesDetalleQuery : IQueryHandler<ListarAntecedentesDetalleParameter>
    {
        public QueryResult Handle(ListarAntecedentesDetalleParameter parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idordenservicio", dbType: DbType.Int64, direction: ParameterDirection.Input, value: parameters.idordenservicio);
                var result = new ListarAntecedentesDetalleResult();
                var multiquery =  connection.QueryMultiple
                (
                    "reparacion.pa_obtenerantecedentesordenservicio_telecom_detalle",
                    parametros,
                    commandType: CommandType.StoredProcedure
                );
                result.Historico = multiquery.Read<ListarAntecedentesOrdenServicioDetalleDto>().ToList();
                return result;

            }
        }
    }
}

