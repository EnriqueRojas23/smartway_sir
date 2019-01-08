
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
    public class ListarDistritoZonaEditarQuery : IQueryHandler<ListarDistritoZonaEditarParameters>
    {

        public QueryResult Handle(ListarDistritoZonaEditarParameters parameters)
        {
            using (var connection = (SqlConnection)ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idzona", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.idzona);
                parametros.Add("idprovincia", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.idprovincia);

                var resultado = new ListarDistritoZonaEditarResult
                {
                    Hits = connection.Query<ListarDistritoZonaEditarDto>
                        (
                            "mantenimiento.pa_listardistritoszonaseditar",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };

                return resultado;
            }
        }
    }
}
