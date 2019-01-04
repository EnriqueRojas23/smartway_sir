
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
    public class ListarDistritosQuery : IQueryHandler<ListarDistritosParameters>
    {

        public QueryResult Handle(ListarDistritosParameters parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idprovincia", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idprovincia);
                var resultado = new ListarDistritosResult
                {
                    Hits = connection.Query<ListarDistritosDto>
                        (
                            "mantenimiento.pa_listardistritos",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };

                return resultado;
            }
        }
    }
}
