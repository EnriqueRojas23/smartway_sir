using QueryContracts.Common;
using System;
using System.Collections.Generic;
namespace QueryContracts.Smartway.Mantenimiento.Results
{
    public class ListarTipoFallaResult : QueryResult
    {
        public IEnumerable<ListarTipoFallaDto> Hits { get; set; }
    }
    public class ListarTipoFallaDto
    {
        public int idtipofalla { get; set; }
        public string codigo { get; set; }
        public string descripcion { get; set; }
        public bool activo { get; set; }
    }
}


