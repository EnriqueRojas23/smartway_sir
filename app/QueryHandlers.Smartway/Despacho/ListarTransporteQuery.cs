namespace QueryHandlers.Smartway.Despacho
{

    using System.Data;
    using System.Data.SqlClient;
    using Data.Common;
    using QueryContracts.Common;
    using QueryHandlers.Common;
    using QueryHandlers.Common.Dapper;
    using QueryContracts.Smartway.Despacho.Parameters;
    using QueryContracts.Smartway.Despacho.Results;

    public class ListarTransporteQuery : IQueryHandler<ListarTransporteParameter>
    {
        public QueryResult Handle(ListarTransporteParameter parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
            

                var resultado = new ListarTransporteResult
                {
                    Hits = connection.Query<ListarTransporteDto>
                        (
                           "despacho.pa_listrartransportista",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };
                return resultado;

            }
        }
    }
}

