
using Data.Common;
using QueryContracts.Common;
using QueryContracts.Smartway.Mantenimiento.Parameters;
using QueryContracts.Smartway.Mantenimiento.Results;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;
using System.Data.SqlClient;
namespace QueryHandlers.Smartway.Mantenimiento
{
    public class ListarProductosxIdsQuery : IQueryHandler<ListarProductosxIdsParameters>
    {

        public QueryResult Handle(ListarProductosxIdsParameters parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("codigosproducto", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.codigos);

                var resultado = new ListarProductosxIdsResult
                {
                    Hits = connection.Query<ListarProductosxIdsDto>
                        (
                            "mantenimiento.pa_listarproductoxids",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };

                return resultado;
            }
        }
    }
}
