
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
    public class ListarZonasQuery : IQueryHandler<ListarZonasParameters>
    {

        public QueryResult Handle(ListarZonasParameters parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("iddepartamento", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.iddepartamento);
                parametros.Add("zona", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.zona);

                var resultado = new ListarZonasResult
                {
                    Hits = connection.Query<ListarZonasDto>
                        (
                            "mantenimiento.pa_listarzonas",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };

                return resultado;
            }
        }
    }
}
