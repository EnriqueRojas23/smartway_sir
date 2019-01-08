using Data.Common;
using QueryContracts.Common;
using QueryContracts.Smartway.Mantenimiento.Parameters;
using QueryContracts.Smartway.Mantenimiento.Results;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;

namespace QueryHandlers.Smartway.Mantenimiento
{
    public class ListarFallaQuery : IQueryHandler<ListarFallaParameters>
    {
        public QueryResult Handle(ListarFallaParameters parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idcategoriafalla", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idcategoriafalla);
                parametros.Add("idfabricante", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idfabricante);

                var resultado = new ListarFallaResult
                {
                     Hits = connection.Query<ListarFallaDto>
                        (
                            "mantenimiento.pa_listarfalla",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };
                return resultado;
            }
        }
    }
}
