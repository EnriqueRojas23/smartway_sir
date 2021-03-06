﻿namespace QueryHandlers.Smartway.Despacho
{

    using System.Data;
    using Data.Common;
    using QueryContracts.Common;
    using QueryHandlers.Common;
    using QueryHandlers.Common.Dapper;
    using QueryContracts.Smartway.Despacho.Parameters;
    using QueryContracts.Smartway.Despacho.Results;

    public class ListarOrdenSalidaQuery : IQueryHandler<ListarOrdenSalidaParameter>
    {
        public QueryResult Handle(ListarOrdenSalidaParameter parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("numeroorden", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.numeroorden);
                var resultado = new ListarOrdenSalidaResult
                {
                    Hits = connection.Query<ListarOrdenSalidaDto>
                        (
                            "despacho.pa_listarordensalida",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };
                return resultado;

            }
        }
    }
}

