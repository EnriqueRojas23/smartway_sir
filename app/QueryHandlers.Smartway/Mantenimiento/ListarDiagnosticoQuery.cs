
using Data.Common;
using QueryContracts.Common;
using QueryContracts.Smartway.Mantenimiento.Parameters;
using QueryContracts.Smartway.Mantenimiento.Results;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;
using System.Data.SqlClient;
namespace QueryHandlers.TYS.Seguimiento
{
    public class ListarDiagnosticoQuery : IQueryHandler<ListarDiagnosticoParameters>
    {

        public QueryResult Handle(ListarDiagnosticoParameters parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                //parametros.Add("idcategoriareparacion", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idcategoriareparacion);
                //parametros.Add("idfabricante", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idfabricante);
                parametros.Add("idtipoproducto", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idtipoproducto);
                parametros.Add("iddiagnostico", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.iddiagnostico);
                parametros.Add("garantia", dbType: DbType.Boolean, direction: ParameterDirection.Input, value: parameters.garantia);

                var resultado = new ListarDiagnosticoResult
                {
                    Hits = connection.Query<ListarDiagnosticoDto>
                        (
                            "mantenimiento.pa_listadiagnosticosmartway",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };

                return resultado;
            }
        }
    }
}
