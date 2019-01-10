using Data.Common;
using QueryContracts.Common;
using QueryContracts.Smartway.Reparacion.Parameters;
using QueryContracts.Smartway.Reparacion.Results;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;

namespace QueryHandlers.Smartway.Reparacion
{
    public class ListarOrdenTrabajoTiempoQuery : IQueryHandler<ListarOrdenTrabajoTiempoParameters>
    {
        public QueryResult Handle(ListarOrdenTrabajoTiempoParameters parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idordentrabajo", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idordentrabajo);
                
                var resultado = new ListarOrdenTrabajoTiempoResult
                {
                     Hits = connection.Query<ListarOrdenTrabajoTiempoDto>
                        (
                            "reparacion.pa_listarordentrabajotiempo",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };
                return resultado;
            }
        }
    }
}
