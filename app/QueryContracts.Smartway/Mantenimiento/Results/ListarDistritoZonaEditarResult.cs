using QueryContracts.Common;
using System;
using System.Collections.Generic;
namespace QueryContracts.Smartway.Mantenimiento.Results
{
    public class ListarDistritoZonaEditarResult : QueryResult
    {
        public IEnumerable<ListarDistritoZonaEditarDto> Hits { get; set; }
    }
    public class ListarDistritoZonaEditarDto
    {
        public int iddistrito { get; set; }
        public bool idzona { get; set; }
        public string distrito { get; set; }

    }
}


