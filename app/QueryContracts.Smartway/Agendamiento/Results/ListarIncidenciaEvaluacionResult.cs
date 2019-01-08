namespace QueryContracts.Smartway.Agendamiento.Incidencias.Results
{
    using System.Collections.Generic;
    using QueryContracts.Common;
    using System;

    public class ListarIncidenciaEvaluacionResult : QueryResult
    {
        public IEnumerable<ListarIncidenciaEvaluacionDto> Hits { get; set; }
    }

    public class ListarIncidenciaEvaluacionDto
    {
        public long idevaluaciongarantia { get; set; }
        public long idincidencia { get; set; }
        public int idcondicion { get; set; }
        public bool valor { get; set; }
        public string observacion { get; set; }
        public int idusuarioregistro { get; set; }
        public DateTime fechahoraregistro { get; set; }

    }
}
