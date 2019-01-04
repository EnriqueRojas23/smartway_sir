namespace QueryContracts.Smartway.Agendamiento.Incidencias.Results
{
    using System.Collections.Generic;
    using QueryContracts.Common;

    public class ListarPropuestasSolucionResult : QueryResult
    {
        public IEnumerable<ListarPropuestasSolucionDto> Hits { get; set; }
    }
    public class ListarPropuestasSolucionDto
    {
        public int idpropuestasolucion  { get; set; }
        public string descripcion { get; set; }
        public bool requiereaprobacion { get; set; }
        public bool requieredocumentointerno { get; set; }
        public int idpropuesta { get; set; }
    }
}
