using Data.Common;
using QueryContracts.Common;
using QueryContracts.Smartway.Recepcion.Parameters;
using QueryContracts.Smartway.Reparacion.Results;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;

namespace QueryHandlers.Smartway.Recepcion
{
    public class ListarOrdenServicioRecepcionQuery : IQueryHandler<ListarOrdenServicioRecepcionParameters>
    {
        public QueryResult Handle(ListarOrdenServicioRecepcionParameters parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idguiaremision", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idguiaremision);

                var resultado = new ListarOrdenServicioRecepcionResult
                {
                     Hits = connection.Query<ListarOrdenServicioRecepcionDto>
                        (
                            "recepcion.pa_listarordenservicio",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };
                return resultado;
            }
        }
    }
}
