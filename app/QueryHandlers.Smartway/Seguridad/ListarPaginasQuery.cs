
using Data.Common;
using QueryContracts.Common;
using QueryContracts.Smartway.Seguridad.Parameters;
using QueryContracts.Smartway.Seguridad.Result;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;
using System.Data.SqlClient;
using System.Linq;


namespace QueryHandlers.Smartway.Seguridad
{
    public class ListarPaginasQuery : IQueryHandler<ListarPaginasParameter>
    {

        public QueryResult Handle(ListarPaginasParameter parameters)
        {

            using (var connection = (SqlConnection)ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("pag_str_nombre", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.pag_str_nombre);

                var result = new ListarPaginasResult();
                result.Hits = connection.Query<ListarPaginasDto>(
                                    "seguridad.pa_listarpaginas",
                                    parametros,
                                    commandType: CommandType.StoredProcedure).ToList();
                return result;
            }




        
        }
    }
}
