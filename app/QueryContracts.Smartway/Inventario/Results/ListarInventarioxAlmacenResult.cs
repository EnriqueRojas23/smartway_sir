

using QueryContracts.Common;
using System;
using System.Collections.Generic;
    
namespace QueryContracts.Smartway.Inventario.Results
{
    public class ListarInventarioxAlmacenResult : QueryResult
    {
        public IEnumerable<ListarInventarioxAlmacenDto> Hits { get; set; }
    }
    public class ListarInventarioxAlmacenDto : QueryResult
    {
        public long idinventario { get; set; }
        public int idproducto { get; set; }
        public string codigoproducto { get; set; }
        public string descripcionlarga { get; set; }
        public DateTime fechahoraregistro { get; set; }
        public int idalmacen { get; set; }
        public string nombrealmacen { get; set; }
        public string serie { get; set; }
        public string imei { get; set; }
        public int idestado { get; set; }
        public string estado { get; set; }
        public int cantidad { get; set; }
        public string modelo { get; set; }
        public bool repuesto { get; set; }

    }

}
