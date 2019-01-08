
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
    public class ListarSucursalQuery : IQueryHandler<ListarSucursalParameters>
    {

        public QueryResult Handle(ListarSucursalParameters parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("Nombre", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.Nombre);
                parametros.Add("idtipopartner", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idtipopartner);
                parametros.Add("Codigo", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.Codigo);
                parametros.Add("idpartner", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.idpartner);

                var resultado = new ListarSucursalResult
                {
                    Hits = connection.Query<ListarSucursalDto>
                        (
                            "mantenimiento.pa_listarsucursales",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };

                return resultado;
            }
        }
    }
}
