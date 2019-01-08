
using Data.Common;
using QueryContracts.Common;
using QueryContracts.Smartway.Mantenimiento.Parameters;
using QueryContracts.Smartway.Mantenimiento.Results;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
namespace QueryHandlers.Smartway.Mantenimiento
{
    public class ObtenerProductoQuery : IQueryHandler<ObtenerProductoParameter>
    {

        public QueryResult Handle(ObtenerProductoParameter parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idproducto", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idproducto);
                parametros.Add("codigoproducto", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.codigoproducto);

                var resultado = new ObtenerProductoResult();
                resultado = connection.Query<ObtenerProductoResult>
                        (
                            "mantenimiento.pa_obtenerproducto",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ).LastOrDefault();

                return resultado;
            }
        }
    }
}
