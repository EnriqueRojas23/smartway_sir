namespace QueryHandlers.Smartway.Despacho
{

    using System.Data;
    using Data.Common;
    using QueryContracts.Common;
    using QueryHandlers.Common;
    using QueryHandlers.Common.Dapper;
    using QueryContracts.Smartway.Despacho.Parameters;
    using QueryContracts.Smartway.Despacho.Results;

    public class ListarGuiaRemisionDetalleQuery : IQueryHandler<ListarGuiaRemisionDetalleParameter>
    {
        public QueryResult Handle(ListarGuiaRemisionDetalleParameter parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idguiaremision", dbType: DbType.Int64, direction: ParameterDirection.Input, value: parameters.idguiaremision);
                var resultado = new ListarGuiaRemisionDetalleResult
                {
                    Hits = connection.Query<ListarGuiaRemisionDetalleDto>
                        (
                            "despacho.pa_listarguiaremisiondetalle",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };
                return resultado;

            }
        }
    }
}

