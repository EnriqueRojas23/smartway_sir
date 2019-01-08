
using Data.Common;
using QueryContracts.Common;
using QueryContracts.Smartway.Mantenimiento.Parameters;
using QueryContracts.Smartway.Mantenimiento.Results;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;
using System.Data.SqlClient;
namespace QueryHandlers.Smartway.Mantenimiento
{
    public class ListarReparacionRepuestoQuery : IQueryHandler<ListarReparacionRepuestoParameters>
    {

        public QueryResult Handle(ListarReparacionRepuestoParameters parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idrepuesto", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idrepuesto);
                var resultado = new ListarReparacionRepuestoResult
                {
                    Hits = connection.Query<ListarReparacionRepuestoDto>
                        (
                            "mantenimiento.pa_listarreparacionxrepuesto",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ),
                };

                return resultado;
            }
        }
    }
}
