namespace QueryHandlers.Smartway.Despacho
{

    using System.Data;
    using Data.Common;
    using QueryContracts.Common;
    using QueryHandlers.Common;
    using QueryHandlers.Common.Dapper;
    using QueryContracts.Smartway.Despacho.Parameters;
    using QueryContracts.Smartway.Despacho.Results;
    using System.Linq;

    public class ObtenerGuiaRemisionQuery : IQueryHandler<ObtenerGuiaRemisionParameter>
    {
        public QueryResult Handle(ObtenerGuiaRemisionParameter parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idguiaremision", dbType: DbType.Int64, direction: ParameterDirection.Input, value: parameters.idguiaremision);

                var resultado = new ObtenerGuiaRemisionResult();
                resultado = connection.Query<ObtenerGuiaRemisionResult>
                        (
                            "despacho.pa_obtenerguiaremision",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ).LastOrDefault();
                return resultado;

            }
        }
    }
}

