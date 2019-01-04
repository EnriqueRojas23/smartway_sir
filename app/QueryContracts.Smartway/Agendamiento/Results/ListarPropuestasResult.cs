namespace QueryContracts.Smartway.Agendamiento.Incidencias.Results
{
    using System.Collections.Generic;
    using QueryContracts.Common;

    public class ListarPropuestasResult : QueryResult
    {
        public IEnumerable<ListarPropuestasDto> Hits { get; set; }
    }

    public class ListarPropuestasDto
    {
        public int    idpropuesta { get; set; }
        public string descripcion { get; set; }
        public bool requiereautorizacion { get; set; }
        public bool requieredocumentointerno { get; set; }
    }
}
