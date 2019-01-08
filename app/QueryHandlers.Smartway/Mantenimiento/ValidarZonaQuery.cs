
using Data.Common;
using QueryContracts.Common;
using QueryContracts.Smartway.Mantenimiento.Parameters;
using QueryContracts.Smartway.Mantenimiento.Results;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
namespace QueryHandlers.Smartway.Mantenimiento
{
    public class ValidarZonaQuery : IQueryHandler<ValidarZonaParameter>
    {

        public QueryResult Handle(ValidarZonaParameter parameters)
        {
            using (var connection = ConnectionFactory.CreateFromUserSession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idzona", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idzona);
                parametros.Add("zona", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.zona);

                var resultado = new ValidarZonaResult();
                resultado = connection.Query<ValidarZonaResult>
                        (
                            "Mantenimiento.pa_validarzona",
                            parametros,
                            commandType: CommandType.StoredProcedure
                        ).LastOrDefault();

                return resultado;
            }
        }
    }
}
