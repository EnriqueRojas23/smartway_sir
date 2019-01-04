using QueryContracts.Common;
using System;
using System.Collections.Generic;
namespace QueryContracts.Smartway.Mantenimiento.Results
{
    public class ListarTipoDiagnosticoResult : QueryResult
    {
        public IEnumerable<ListarTipoDiagnosticoDto> Hits { get; set; }
    }
    public class ListarTipoDiagnosticoDto
    {
        public int idtipodiagnostico { get; set; }
        public string codigo { get; set; }
        public string descripcion { get; set; }
        public bool activo { get; set; }
    }
}


