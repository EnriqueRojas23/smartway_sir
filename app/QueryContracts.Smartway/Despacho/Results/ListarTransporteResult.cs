namespace QueryContracts.Smartway.Despacho.Results
{
    using QueryContracts.Common;
    using System.Collections.Generic;

    public class ListarTransporteResult : QueryResult
    {
        public IEnumerable<ListarTransporteDto> Hits { get; set; }
    }

    public class ListarTransporteDto
    {
        public int idtransportista { get; set; }
        public string razonsocial { get; set; }
    
    }

}