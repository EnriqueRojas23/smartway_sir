using Data.Common;
using QueryContracts.Common;
using QueryContracts.Smartway.Mantenimiento.Parameters;
using QueryContracts.Smartway.Mantenimiento.Results;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;

namespace QueryHandlers.Smartway.Mantenimiento
{
    public class ListarTipoDiagnosticoQuery : IQueryHandler<ListarTipoDiagnosticoParameters>
    {
        public QueryResult Handle(ListarTipoDiagnosticoParameters parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                var resultado = new ListarTipoDiagnosticoResult
                {
                     Hits = connection.Query<ListarTipoDiagnosticoDto>
                        (
                            "mantenimiento.pa_listartipodiagnostico",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };
                return resultado;
            }
        }
    }
}
