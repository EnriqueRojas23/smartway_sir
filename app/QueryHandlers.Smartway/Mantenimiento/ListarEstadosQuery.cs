namespace QueryHandlers.Smartway.Mantenimiento
{

    using System.Data;
    using System.Data.SqlClient;
    using Data.Common;
    using QueryContracts.Common;
    using QueryHandlers.Common;
    using QueryHandlers.Common.Dapper;
    using QueryContracts.Smartway.Mantenimiento.Parameters;
    using QueryContracts.Smartway.Mantenimiento.Results;

    public class ListarestadosQuery : IQueryHandler<ListarEstadosParameter>
    {
        public QueryResult Handle(ListarEstadosParameter parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idmaestrotabla", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idtabla);
                var resultado = new ListarEstadosResult
                {
                    Hits = connection.Query<ListarEstadosDto>
                        (
                            "mantenimiento.pa_listarestados",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };
                return resultado;
            }
        }
    }
}

