namespace QueryHandlers.Smartway.Despacho
{

    using System.Data;
    using Data.Common;
    using QueryContracts.Common;
    using QueryHandlers.Common;
    using QueryHandlers.Common.Dapper;
    using QueryContracts.Smartway.Despacho.Parameters;
    using QueryContracts.Smartway.Despacho.Results;
    using System.Linq;

    public class EntregarDespachoDeliveryQuery : IQueryHandler<EntregarDespachoDeliveryParameter>
    {
        public QueryResult Handle(EntregarDespachoDeliveryParameter parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idprogramacion", dbType: DbType.Int64, direction: ParameterDirection.Input, value: parameters.idprogramacion);
                var resultado = new EntregarDespachoDeliveryResult();
                resultado = connection.Query<EntregarDespachoDeliveryResult>
                        (
                            "despacho.pa_despacharprogramaciondelivery",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ).LastOrDefault();
                return resultado;

            }
        }
    }
}

