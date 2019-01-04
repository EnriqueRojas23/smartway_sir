using Data.Common;
using QueryContracts.Common;
using QueryContracts.Smartway.Mantenimiento.Parameters;
using QueryContracts.Smartway.Mantenimiento.Results;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;

namespace QueryHandlers.Smartway.Mantenimiento
{
    public class ListarCategoriaFallaQuery : IQueryHandler<ListarCategoriaFallaParameters>
    {
        public QueryResult Handle(ListarCategoriaFallaParameters parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                var resultado = new ListarCategoriaFallaResult
                {
                     Hits = connection.Query<ListarCategoriaFallaDto>
                        (
                            "mantenimiento.pa_listarcategoriafalla",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };
                return resultado;
            }
        }
    }
}
