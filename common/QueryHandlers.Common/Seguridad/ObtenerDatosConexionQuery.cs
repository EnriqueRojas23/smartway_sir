
using QueryContracts.Common;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;
using System.Linq;
using Data.Common;

namespace QueryHandlers.Common
{
    public class ObtenerDatosConexionQuery : IQueryHandler<ObtenerDatosConexionParameter>
    {
        public QueryResult Handle(ObtenerDatosConexionParameter parameters)
        {
            using (var connection = ConnectionFactory.CreateFromSecuriSmartwayession())
            {
                var parametros = new DynamicParameters();
                parametros.Add("usr_str_red", dbType: DbType.String, value: parameters.AliasUsuario);
                parametros.Add("rol_int_id", dbType: DbType.Int32, value: parameters.IdRol);
                parametros.Add("sis_int_id", dbType: DbType.Int32, value: parameters.CodigoSistema);
                    
                var result = connection.Query<ObtenerDatosConexionResult>(
                       "SEGURIDAD.SP_GETDATCNX", parametros, commandType: CommandType.StoredProcedure
                    ).LastOrDefault();

                return result;
            }

        }
    }
}
