using Data.Common;
using QueryContracts.Common;
using QueryContracts.Smartway.Reparacion.Parameters;
using QueryContracts.Smartway.Reparacion.Results;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;

namespace QueryHandlers.Smartway.Reparacion
{
    public class ListarOrdenTrabajoDetalleQuery : IQueryHandler<ListarOrdenTrabajoDetalleParameters>
    {
        public QueryResult Handle(ListarOrdenTrabajoDetalleParameters parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idordentrabajo", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idordentrabajo);

                var resultado = new ListarOrdenTrabajoDetalleResult

                {
                     Hits = connection.Query<ListarOrdenTrabajoDetalleDto>
                        (
                            "reparacion.pa_listarordentrabajodetalle",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };
                return resultado;
            }
        }
    }
}
