
using Data.Common;
using QueryContracts.Common;
using QueryContracts.Smartway.Mantenimiento.Parameters;
using QueryContracts.Smartway.Mantenimiento.Results;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;
namespace QueryHandlers.Smartway.Mantenimiento
{
    public class ListarTipoProductoQuery : IQueryHandler<ListarTipoProductoParameters>
    {

        public QueryResult Handle(ListarTipoProductoParameters parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                var resultado = new ListarTipoProductoResult
                {
                    Hits = connection.Query<ListarTipoProductoDto>
                        (
                            "mantenimiento.pa_listartipoproducto",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };

                return resultado;
            }
        }
    }
}
