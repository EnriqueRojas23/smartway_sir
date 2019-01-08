
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
    public class ListarRepuestosxProductoQuery : IQueryHandler<ListarRepuestosxProductoParameters>
    {

        public QueryResult Handle(ListarRepuestosxProductoParameters parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idproducto", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idproducto);
                var resultado = new ListarRepuestosxProductoResult
                {
                    Hits = connection.Query<ListarRepuestosxProductoDto>
                        (
                            "mantenimiento.pa_listarrepuestoxproducto",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };

                return resultado;
            }
        }
    }
}
