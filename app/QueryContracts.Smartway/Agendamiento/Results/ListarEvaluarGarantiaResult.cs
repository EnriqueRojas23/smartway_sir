namespace QueryContracts.Smartway.Agendamiento.Incidencias.Results
{
    using QueryContracts.Common;
    using System;
    using System.Collections.Generic;

    public class ListarEvaluarGarantiaResult : QueryResult
    {
        public IEnumerable<ListarEvaluarGarantiaDto> Hits { get; set; }
    }
    public class ListarEvaluarGarantiaDto
    {
        public int idgarantia { get; set; }
        public string tipogarantia { get; set; }
        public string descripcion { get; set; }
        public bool resultado { get; set; }
        public int periodo { get; set; }
        public int idtipogarantia { get; set; }
    }

}
