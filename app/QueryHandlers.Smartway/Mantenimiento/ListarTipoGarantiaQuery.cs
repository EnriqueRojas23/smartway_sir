
using Data.Common;
using QueryContracts.Common;
using QueryContracts.Smartway.Mantenimiento.Parameters;
using QueryContracts.Smartway.Mantenimiento.Results;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;
namespace QueryHandlers.Smartway.Mantenimiento
{
    public class ListarTipoGarantiaQuery : IQueryHandler<ListarTipoGarantiaParameters>
    {

        public QueryResult Handle(ListarTipoGarantiaParameters parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                var resultado = new ListarTipoGarantiaResult
                {
                    Hits = connection.Query<ListarTipoGarantiaDto>
                        (
                            "mantenimiento.pa_listartipogarantia",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };

                return resultado;
            }
        }
    }
}
