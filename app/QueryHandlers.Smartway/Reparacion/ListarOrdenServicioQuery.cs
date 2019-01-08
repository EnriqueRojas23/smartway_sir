using Data.Common;
using QueryContracts.Common;
using QueryContracts.Smartway.Reparacion.Parameters;
using QueryContracts.Smartway.Reparacion.Results;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;

namespace QueryHandlers.Smartway.Reparacion
{
    public class ListarOrdenServicioQuery : IQueryHandler<ListarOrdenServicioParameters>
    {
        public QueryResult Handle(ListarOrdenServicioParameters parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idtecnico", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idtecnico);
                parametros.Add("fechainicio", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.fechainicio);
                parametros.Add("fechafin", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.fechafin);
                parametros.Add("idestado", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idestado);
                parametros.Add("numeroordenservicio", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.numeroordenservicio);
                parametros.Add("serie", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.serie);
                

                var resultado = new ListarOrdenServicioResult

                {
                     Hits = connection.Query<ListarOrdenServicioDto>
                        (
                            "reparacion.pa_listarordenservicio",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };
                return resultado;
            }
        }
    }
}
