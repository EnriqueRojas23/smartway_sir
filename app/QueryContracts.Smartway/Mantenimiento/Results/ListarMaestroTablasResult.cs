using QueryContracts.Common;
using System;
using System.Collections.Generic;
namespace QueryContracts.Smartway.Mantenimiento.Results
{
    public class ListarMaestroTablasResult : QueryResult
    {
        public IEnumerable<ListarMaestroTablasDto> Hits { get; set; }
    }
    public class ListarMaestroTablasDto
    {
        public int idmaestrotabla { get; set; }
        public string tabla { get; set; }

    }
}


