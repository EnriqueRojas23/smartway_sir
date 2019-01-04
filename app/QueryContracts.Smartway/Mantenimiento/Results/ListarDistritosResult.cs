using QueryContracts.Common;
using System;
using System.Collections.Generic;
namespace QueryContracts.Smartway.Mantenimiento.Results
{
    public class ListarDistritosResult : QueryResult
    {
        public IEnumerable<ListarDistritosDto> Hits { get; set; }
    }
    public class ListarDistritosDto
    {
        public int iddistrito { get; set; }
        public string distrito { get; set; }
        public bool seleccionado { get; set; }

    }
}


