
using Data.Common;
using QueryContracts.Common;
using QueryContracts.Smartway.Mantenimiento.Parameters;
using QueryContracts.Smartway.Mantenimiento.Results;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;
namespace QueryHandlers.Smartway.Mantenimiento
{
    public class ListarGarantiaQuery : IQueryHandler<ListarGarantiaParameters>
    {

        public QueryResult Handle(ListarGarantiaParameters parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idpartner", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idpartner);
                var resultado = new ListarGarantiaResult
                {
                    Hits = connection.Query<ListarGarantiaDto>
                        (
                            "mantenimiento.pa_listargarantias",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };

                return resultado;
            }
        }
    }
}
