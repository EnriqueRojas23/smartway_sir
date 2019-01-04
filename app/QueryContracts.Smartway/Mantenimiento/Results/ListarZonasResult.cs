using QueryContracts.Common;
using System;
using System.Collections.Generic;
namespace QueryContracts.Smartway.Mantenimiento.Results
{
    public class ListarZonasResult : QueryResult
    {
        public IEnumerable<ListarZonasDto> Hits { get; set; }
    }
    public class ListarZonasDto
    {
        public int idzona { get; set; }
        public string zona { get; set; }
        public string departamento { get; set; }
        public int cantidad { get; set; }

    }
}


