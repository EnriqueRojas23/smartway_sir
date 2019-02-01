
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
    public class ListarReparacionQuery : IQueryHandler<ListarReparacionParameters>
    {
        public QueryResult Handle(ListarReparacionParameters parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idcategoriareparacion", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idcategoriareparacion);
                parametros.Add("idreparacion", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idreparacion);
                parametros.Add("idtipoproducto", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idtipoproducto);

                var resultado = new ListarReparacionResult
                {
                    Hits = connection.Query<ListarReparacionDto>
                        (
                            "mantenimiento.pa_listareparacionsmartway",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };

                return resultado;
            }
        }
    }
}
