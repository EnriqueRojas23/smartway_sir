

using QueryContracts.Common;
using System.Collections.Generic;
namespace QueryContracts.Neptunia.Seguridad.Result
{
    public class ListarClientesResult : QueryResult
    {
        public IEnumerable<ListarClientesDto> Hits { get; set; }
    }
    public class ListarClientesDto
    {
        public int cli_int_id { get; set; }
        public string cli_razonsocial { get; set; }
    }
}
