namespace QueryContracts.Smartway.Agendamiento.Incidencias.Results
{
    using QueryContracts.Common;

    public class ObtenerNumeroIncidenciaResult : QueryResult
    {
        public string numero_incidencia { get; set; }
        public int anio_incidencia { get; set; }
    }

}
