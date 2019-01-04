namespace QueryContracts.Smartway.Despacho.Results
{
    using QueryContracts.Common;
    using System;
    using System.Collections.Generic;

    public class ListarGuiaRemisionResult : QueryResult
    {
        public IEnumerable<ListarGuiaRemisionDto> Hits { get; set; }
    }

    public class ListarGuiaRemisionDto
    {
        public long idguiaremision { get; set; }
        public string numeroguia { get; set; }
        public string codigoorigen { get; set; }
        public string direccionorigen { get; set; }
        public string codigodestino { get; set; }
        public string direcciondestino { get; set; }
        public string descripcion { get; set; }
        public string fechaguiaremision { get; set; }
    }

}