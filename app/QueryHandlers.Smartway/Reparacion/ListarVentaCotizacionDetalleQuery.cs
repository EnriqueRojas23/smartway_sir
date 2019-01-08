using Data.Common;
using QueryContracts.Common;
using QueryContracts.Smartway.Reparacion.Parameters;
using QueryContracts.Smartway.Reparacion.Results;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;

namespace QueryHandlers.Smartway.Reparacion
{
    public class ListarVentaCotizacionDetalleQuery : IQueryHandler<ListarVentaCotizacionDetalleParameters>
    {
        public QueryResult Handle(ListarVentaCotizacionDetalleParameters parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idordenservicio", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idordenservicio);
                var resultado = new ListarVentaCotizacionDetalleResult
                {
                     Hits = connection.Query<ListarVentaCotizacionDetalleDto>
                        (
                            "agendamiento.pa_listarventacotizaciondetalle",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };
                return resultado;
            }
        }
    }
}
