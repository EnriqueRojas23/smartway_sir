
using Data.Common;
using QueryContracts.Common;
using QueryContracts.Smartway.Mantenimiento.Parameters;
using QueryContracts.Smartway.Mantenimiento.Results;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;
using System.Data.SqlClient;
namespace QueryHandlers.TYS.Seguimiento
{
    public class ListarTarifaQuery : IQueryHandler<ListarTarifaParameters>
    {

        public QueryResult Handle(ListarTarifaParameters parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idpartner", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idpartner);

                var resultado = new ListarTarifaResult
                {
                    Hits = connection.Query<ListarTarifaDto>
                        (
                            "mantenimiento.pa_listartarifas",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };

                return resultado;
            }
        }
    }
}
