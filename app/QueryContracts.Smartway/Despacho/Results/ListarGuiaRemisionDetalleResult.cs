namespace QueryContracts.Smartway.Despacho.Results
{
    using QueryContracts.Common;
    using System;
    using System.Collections.Generic;

    public class ListarGuiaRemisionDetalleResult : QueryResult
    {
        public IEnumerable<ListarGuiaRemisionDetalleDto> Hits { get; set; }
    }

    public class ListarGuiaRemisionDetalleDto
    {
        public long idguiadetalle { get; set; }
        public string codigo { get; set; }
        public string descripcion { get; set; }
        public int cantidad { get; set; }
        public long idguiaremision { get; set; }
    }

}