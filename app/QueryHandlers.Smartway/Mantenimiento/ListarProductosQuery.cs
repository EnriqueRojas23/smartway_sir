
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
    public class ListarProductosQuery : IQueryHandler<ListarProductosParameters>
    {

        public QueryResult Handle(ListarProductosParameters parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("codigo", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.codigo);
                parametros.Add("descripcion", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.descripcion);
                parametros.Add("idfabricante", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idfabricante);
                parametros.Add("idtipoproducto", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idtipoproducto);
                parametros.Add("idmodelo", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idmodelo);
                parametros.Add("repuesto", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.repuesto);

                var resultado = new ListarProductosResult
                {
                    Hits = connection.Query<ListarProductosDto>
                        (
                            "mantenimiento.pa_listarproductos",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };

                return resultado;
            }
        }
    }
}
