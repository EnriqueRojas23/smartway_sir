namespace QueryContracts.Smartway.Reparacion.Results
{
    using QueryContracts.Common;
    using System;
    using System.Collections.Generic;

    public class ListarAntecedentesDetalleResult : QueryResult
    {
        public IEnumerable<ListarAntecedentesOrdenServicioDetalleDto> Historico { get; set; }
        //public IEnumerable<ListarAntecedentesOrdenServicioDto> Productos { get; set; }
    }

    public class ListarAntecedentesOrdenServicioDetalleDto
    {
        public string diagnostico { get; set; }
        public string reparacion { get; set; }
        public string tecnico { get; set; }
    }


}