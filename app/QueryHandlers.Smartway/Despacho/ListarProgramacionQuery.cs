namespace QueryHandlers.Smartway.Despacho
{

    using System.Data;
    using Data.Common;
    using QueryContracts.Common;
    using QueryHandlers.Common;
    using QueryHandlers.Common.Dapper;
    using QueryContracts.Smartway.Despacho.Parameters;
    using QueryContracts.Smartway.Despacho.Results;

    public class ListarProgramacionQuery : IQueryHandler<ListarProgramacionParameter>
    {
        public QueryResult Handle(ListarProgramacionParameter parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idsucursalorigen", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idsucursalorigen);
                parametros.Add("idsucursaldestino", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idsucursaldestino);
                parametros.Add("fecini", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.fechaini);
                parametros.Add("fecfin", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.fechafin);
                parametros.Add("idestado", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idestado);
                var resultado = new ListarProgramacionResult
                {
                    Hits = connection.Query<ListarProgramacionDto>
                        (
                            "despacho.pa_listarprogramacion",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };
                return resultado;

            }
        }
    }
}

