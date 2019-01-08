using QueryContracts.Common;
using System;
using System.Collections.Generic;
namespace QueryContracts.Smartway.Mantenimiento.Results
{
    public class ListarFallaResult : QueryResult
    {
        public IEnumerable<ListarFallaDto> Hits { get; set; }
    }
    public class ListarFallaDto
    {
        public int idfalla { get; set; }
        public string categoriafalla { get; set; }
        public string tipofalla { get; set; }
        public string tipoproducto { get; set; }
        public string fabricante { get; set; }
        public string codigosmartway { get; set; }
        public string descripcion { get; set; }
    }
}


