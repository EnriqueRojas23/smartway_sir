namespace QueryContracts.Smartway.Agendamiento.Incidencias.Results
{
    using QueryContracts.Common;
    using System;
    using System.Collections.Generic;

    public class ListarCondicionesResult : QueryResult
    {
        public IEnumerable<ListarCondicionesDto> Hits { get; set; }
    }
    public class ListarCondicionesDto
    {
        public int idcondicion { get; set; }
        public string tipocondicion { get; set; }
        public string descripcion { get; set; }
        public bool valor { get; set; }

    }

}
