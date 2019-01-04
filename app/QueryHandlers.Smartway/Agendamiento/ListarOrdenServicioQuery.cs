using Data.Common;
using QueryContracts.Common;
using QueryContracts.Smartway.Agendamiento.Parameters;
using QueryContracts.Smartway.Agendamiento.Results;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;

namespace QueryHandlers.Smartway.Agendamiento
{
    public class ListarOrdenServicioQuery : IQueryHandler<ListarOrdenServicioParameters>
    {
        public QueryResult Handle(ListarOrdenServicioParameters parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idtipoordenservicio", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idtipoordenservicio);
                parametros.Add("idestado", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idestado);
                parametros.Add("fecini", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.fecini);
                parametros.Add("fecfin", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.fecfin);
                parametros.Add("numeroordenservicio", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.numeroordenservicio);


                var resultado = new ListarOrdenServicioResult
                {
                     Hits = connection.Query<ListarOrdenServicioDto>
                        (
                            "agendamiento.pa_listarordenservicio",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };
                return resultado;
            }
        }
    }
}
