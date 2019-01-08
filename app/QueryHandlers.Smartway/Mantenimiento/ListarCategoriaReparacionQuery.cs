
using Data.Common;
using QueryContracts.Common;
using QueryContracts.Smartway.Mantenimiento.Parameters;
using QueryContracts.Smartway.Mantenimiento.Results;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;
namespace QueryHandlers.Smartway.Mantenimiento
{
    public class ListarCategoriaReparacionQuery : IQueryHandler<ListarCategoriaReparacionParameters>
    {

        public QueryResult Handle(ListarCategoriaReparacionParameters parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                var resultado = new ListarCategoriaReparacionResult
                {
                    Hits = connection.Query<ListarCategoriaReparacionDto>
                        (
                            "mantenimiento.pa_listarcategoriareparacion",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };

                return resultado;
            }
        }
    }
}
