using QueryContracts.Common;
using System;
using System.Collections.Generic;
namespace QueryContracts.Smartway.Mantenimiento.Results
{
    public class ListarValorxTablaResult : QueryResult
    {
        public IEnumerable<ListarValorxTablaDto> Hits { get; set; }
    }
    public class ListarValorxTablaDto
    {
        public int idvalortabla { get; set; }
        public string valor { get; set; }
        public int idmaestrotabla { get; set; }
        public bool activo { get; set; }
        public int orden { get; set; }

    }
}


