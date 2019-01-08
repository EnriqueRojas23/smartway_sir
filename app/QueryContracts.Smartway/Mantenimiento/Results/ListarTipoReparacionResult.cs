using QueryContracts.Common;
using System;
using System.Collections.Generic;
namespace QueryContracts.Smartway.Mantenimiento.Results
{
    public class ListarTipoReparacionResult : QueryResult
    {
        public IEnumerable<ListarTipoReparacionDto> Hits { get; set; }
    }
    public class ListarTipoReparacionDto
    {
        public int idtiporeparacion { get; set; }
        public string codigo { get; set; }
        public string descripcion { get; set; }
        public bool activo { get; set; }

    }
}


