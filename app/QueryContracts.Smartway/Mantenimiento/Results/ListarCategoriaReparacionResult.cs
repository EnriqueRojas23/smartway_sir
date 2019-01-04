using QueryContracts.Common;
using System;
using System.Collections.Generic;
namespace QueryContracts.Smartway.Mantenimiento.Results
{
    public class ListarCategoriaReparacionResult : QueryResult
    {
        public IEnumerable<ListarCategoriaReparacionDto> Hits { get; set; }
    }
    public class ListarCategoriaReparacionDto
    {
        public int idcategoriareparacion { get; set; }
        public string codigo { get; set; }
        public string descripcion { get; set; }
        public bool activo { get; set; }
    }
}


