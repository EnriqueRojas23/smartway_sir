using QueryContracts.Common;
using System;
using System.Collections.Generic;
namespace QueryContracts.Smartway.Mantenimiento.Results
{
    public class ListarRepuestosxProductoResult : QueryResult
    {
        public IEnumerable<ListarRepuestosxProductoDto> Hits { get; set; }
    }
    public class ListarRepuestosxProductoDto
    {
        public int idrepuestoxproducto { get; set; }
        public int idrepuesto { get; set; }
        public string descripcionlarga { get; set; }
    }
}


