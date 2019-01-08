namespace QueryContracts.Smartway.Reparacion.Results
{
    using QueryContracts.Common;
    using System;
    using System.Collections.Generic;

    public class ListarAntecedentesResult : QueryResult
    {
        public IEnumerable<ListarAntecedentesOrdenServicioDto> Historico { get; set; }
        //public IEnumerable<ListarAntecedentesOrdenServicioDto> Productos { get; set; }
    }

    public class ListarAntecedentesOrdenServicioDto
    {
        public long idordenservicio { get; set; }
        public string numeroordenservicio { get; set; }
        public string fechahoraregistro { get; set; }
        public string usuario { get; set; }
        public string tecnico { get; set; }
        public string engarantia { get; set; }
        public string falla { get; set; }
        public string descripcion { get; set; }


    }


}