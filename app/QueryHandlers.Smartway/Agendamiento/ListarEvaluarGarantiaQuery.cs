namespace QueryHandlers.Smartway.Agendamiento.Incidencias
{

    using System.Data;
    using Data.Common;
    using QueryContracts.Common;
    using QueryHandlers.Common;
    using QueryContracts.Smartway.Agendamiento.Incidencias.Parameters;
    using QueryHandlers.Common.Dapper;
    using QueryContracts.Smartway.Agendamiento.Incidencias.Results;

    public class ListarEvaluarGarantiaQuery : IQueryHandler<ListarEvaluarGarantiaParameter>
    {
        public QueryResult Handle(ListarEvaluarGarantiaParameter parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idfabricante", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idfabricante);
                parametros.Add("idtipoproducto", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idtipoproducto);
                parametros.Add("idpartner", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idpartner);



                var resultado = new ListarEvaluarGarantiaResult
                {
                    Hits = connection.Query<ListarEvaluarGarantiaDto>
                     (
                         "agendamiento.pa_evaluargarantia",
                         parametros,
                         commandType: CommandType.StoredProcedure
                     ),
                };

                return resultado;

            
                
            }
        }
    }
}

