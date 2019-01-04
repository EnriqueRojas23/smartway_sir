using QueryContracts.Common;
using System;
using System.Collections.Generic;
namespace QueryContracts.Smartway.Mantenimiento.Results
{
    public class ListarDistritoZonaResult : QueryResult
    {
        public IEnumerable<ListarDistritoZonaDto> Hits { get; set; }
    }
    public class ListarDistritoZonaDto
    {
        public int iddistrito { get; set; }
        public string zona { get; set; }
        public string departamento { get; set; }
        public string provincia { get; set; }
        public string distrito { get; set; }

    }
}


