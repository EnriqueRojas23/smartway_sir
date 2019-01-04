using QueryContracts.Common;
using System;
using System.Collections.Generic;
namespace QueryContracts.Smartway.Mantenimiento.Results
{
    public class ListarCategoriaFallaResult : QueryResult
    {
        public IEnumerable<ListarCategoriaFallaDto> Hits { get; set; }
    }
    public class ListarCategoriaFallaDto
    {
        public int idcategoriafalla { get; set; }
        public string codigo { get; set; }
        public string descripcion { get; set; }
        public bool activo { get; set; }
    }
}


