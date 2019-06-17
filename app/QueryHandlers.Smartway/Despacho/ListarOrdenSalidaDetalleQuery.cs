namespace QueryHandlers.Smartway.Despacho
{

    using System.Data;
    using Data.Common;
    using QueryContracts.Common;
    using QueryHandlers.Common;
    using QueryHandlers.Common.Dapper;
    using QueryContracts.Smartway.Despacho.Parameters;
    using QueryContracts.Smartway.Despacho.Results;

    public class ListarOrdenSalidaDetalleQuery : IQueryHandler<ListarOrdenSalidaDetalleParameter>
    {
        public QueryResult Handle(ListarOrdenSalidaDetalleParameter parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idordensalida", dbType: DbType.Int64, direction: ParameterDirection.Input, value: parameters.idordensalida);
                var resultado = new ListarOrdenSalidaDetalleResult
                {
                    Hits = connection.Query<ListarOrdenSalidaDetalleDto>
                        (
                            "despacho.pa_listarordensalidadetalle",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };
                return resultado;

            }
        }
    }
}

