namespace QueryContracts.Smartway.Agendamiento.Incidencias.Results
{
    using QueryContracts.Common;
    using System.Collections.Generic;

    public class ListarAccesoriosResult : QueryResult
    {
        public IEnumerable<ListarAccesoriosDto> Hits { get; set; }
    }

    public class ListarAccesoriosDto
    {
        public int idaccesorio { get; set; }
        public string descripcion { get; set; }
    }

}