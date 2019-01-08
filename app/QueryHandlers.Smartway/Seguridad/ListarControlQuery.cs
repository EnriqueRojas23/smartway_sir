using Data.Common;
using QueryContracts.Common;
using QueryContracts.Smartway.Seguridad.Parameters;
using QueryHandlers.Common;
using QueryHandlers.Common.Dapper;
using System.Data;
using System.Data.SqlClient;

namespace QueryHandlers.Smartway.Seguridad
{
    public class ListarControlQuery : IQueryHandler<ListarControlParameter>
    {
        public QueryResult Handle(ListarControlParameter parameters)
        {
            return null;
        }
    }
}
