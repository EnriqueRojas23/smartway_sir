namespace QueryContracts.Smartway.Agendamiento.Incidencias.Results
{
    using QueryContracts.Common;
    using System;
    using System.Collections.Generic;

    public class ListarRepuestosResult : QueryResult
    {
        public IEnumerable<ListarRepuestosDto> Hits { get; set; }
    }
    public class ListarRepuestosDto
    {
        public int idrepuestoreparacion { get; set; }
        public int idrepuesto { get; set; }
        public int idproducto { get; set; }
        public int idreparacion { get; set; }
        public string repuesto { get; set; }
        public string descripcionlarga { get; set; }

    }

}
