namespace QueryHandlers.Smartway.Despacho
{

    using System.Data;
    using Data.Common;
    using QueryContracts.Common;
    using QueryHandlers.Common;
    using QueryHandlers.Common.Dapper;
    using QueryContracts.Smartway.Despacho.Parameters;
    using QueryContracts.Smartway.Despacho.Results;

    public class ListarOrdenSalidaQuery : IQueryHandler<ListarOrdenSalidaParameter>
    {
        public QueryResult Handle(ListarOrdenSalidaParameter parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                //parametros.Add("idsucursalorigen", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idordensalida);
                var resultado = new ListarOrdenSalidaResult
                {
                    Hits = connection.Query<ListarOrdenSalidaDto>
                        (
                            "despacho.pa_listarordensalida",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };
                return resultado;

            }
        }
    }
}

