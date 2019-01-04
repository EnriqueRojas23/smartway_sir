
using Data.Common;
using QueryContracts.Common;
using QueryContracts.Smartway.Account.Parameters;
using QueryContracts.Smartway.Account.Results;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using QueryContracts.Smartway.Seguridad.Parameters;
using QueryContracts.Smartway.Seguridad.Result;


namespace QueryHandlers.Smartway.Seguridad
{
    public class EliminarPaginaQuery : IQueryHandler<EliminarPaginaParameter>
    {
        public QueryContracts.Common.QueryResult Handle(EliminarPaginaParameter parameters)
        {
            using (var connection = (SqlConnection)ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("pag_int_id", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.IdPagina);

                var resultado = new EliminarPaginaResult();
                resultado = connection.Query<EliminarPaginaResult>
                        (
                            "seguridad.pa_eliminarPagina",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ).LastOrDefault();
                return resultado;
            }
        }
    }
}
