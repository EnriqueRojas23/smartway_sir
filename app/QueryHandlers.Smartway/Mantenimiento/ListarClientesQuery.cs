
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
    public class ListarClientesQuery : IQueryHandler<ListarClientesParameters>
    {

        public QueryResult Handle(ListarClientesParameters parameters)
        {
            using (var connection = (SqlConnection)ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("criterio", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.criterio);
                parametros.Add("activo", dbType: DbType.Boolean, direction: ParameterDirection.Input, value: parameters.activo);
                parametros.Add("idtipodocumento", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idtipodocumento);

                var resultado = new ListarClientesResult
                {
                    Hits = connection.Query<ListarClientesDto>
                        (
                            "mantenimiento.pa_listarclientes",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };

                return resultado;
            }
        }
    }
}
