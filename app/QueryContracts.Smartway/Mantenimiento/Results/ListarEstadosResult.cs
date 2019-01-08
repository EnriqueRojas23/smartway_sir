namespace QueryContracts.Smartway.Mantenimiento.Results
{

    using System.Collections.Generic;
    using QueryContracts.Common;

    public class ListarEstadosResult : QueryResult
    {
        public IEnumerable<ListarEstadosDto> Hits { get; set; }
    }

    public class ListarEstadosDto
    {
        public int idestado { get; set; }
        public string estado { get; set; }
    }
}
