namespace QueryHandlers.Smartway.Agendamiento.Incidencias
{

    using System.Data;
    using Data.Common;
    using QueryContracts.Common;
    using QueryHandlers.Common;
    using QueryContracts.Smartway.Agendamiento.Incidencias.Parameters;
    using QueryHandlers.Common.Dapper;
    using QueryContracts.Smartway.Agendamiento.Incidencias.Results;

    public class ListarRepuestosQuery : IQueryHandler<ListarRepuestosParameter>
    {
        public QueryResult Handle(ListarRepuestosParameter parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idreparacion", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idreparacion);
                parametros.Add("idproducto", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idproducto);


                var resultado = new ListarRepuestosResult
                {
                    Hits = connection.Query<ListarRepuestosDto>
                     (
                         "agendamiento.pa_listarrepuesto",
                         parametros,
                         commandType: CommandType.StoredProcedure
                     ),
                };

                return resultado;

            
                
            }
        }
    }
}

