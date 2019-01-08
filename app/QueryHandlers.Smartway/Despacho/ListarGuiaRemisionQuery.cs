namespace QueryHandlers.Smartway.Despacho
{

    using System.Data;
    using Data.Common;
    using QueryContracts.Common;
    using QueryHandlers.Common;
    using QueryHandlers.Common.Dapper;
    using QueryContracts.Smartway.Despacho.Parameters;
    using QueryContracts.Smartway.Despacho.Results;

    public class ListarGuiaRemisionQuery : IQueryHandler<ListarGuiaRemisionParameter>
    {
        public QueryResult Handle(ListarGuiaRemisionParameter parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idestado", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idestado);
                parametros.Add("idsucursaldestino", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.idsucursaldestino);
                parametros.Add("idsucursalorigen", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.idsucursalorigen);
                parametros.Add("numguia", dbType: DbType.String, direction: ParameterDirection.Input, value: null);
                var resultado = new ListarGuiaRemisionResult
                {
                    Hits = connection.Query<ListarGuiaRemisionDto>
                        (
                            "despacho.pa_listaguiaremision",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };
                return resultado;

            }
        }
    }
}

