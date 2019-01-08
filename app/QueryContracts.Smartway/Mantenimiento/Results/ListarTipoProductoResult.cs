using QueryContracts.Common;
using System;
using System.Collections.Generic;
namespace QueryContracts.Smartway.Mantenimiento.Results
{
    public class ListarTipoProductoResult : QueryResult
    {
        public IEnumerable<ListarTipoProductoDto> Hits { get; set; }
    }
    public class ListarTipoProductoDto
    {
        public int idtipoproducto { get; set; }
        public string nombre { get; set; }
        public bool repuesto { get; set; }
        public string rutaimagenadelante { get; set; }
        public string rutaimagenatras { get; set; }
        public string rutaimagenizquierda { get; set; }
        public string rutaimagenderecha { get; set; }
    }
}


