namespace QueryContracts.Coolbox.CIC.Incidencias.Results
{
    using QueryContracts.Common;
    using System.Collections.Generic;

    public class ListarPropuestasIncidenciaResult : QueryResult
    {
        public IEnumerable<ListarPropuestasIncidenciaDto> Hits { get; set; }
    }

    public class ListarPropuestasIncidenciaDto
    {
        public long inp_int_id { get; set; }
        public int prop_int_id { get; set; }
        public string prop_str_descripcion { get; set; }
        public string prop_str_observacion { get; set; }
        public int prop_int_estado { get; set; }
        public string prop_str_estado { get; set; }

        public string label_estado { get; set; }
        public string imagen_estado { get; set; }
        public bool solicitud { get; set; }
        public string prenota { get; set; }
        public bool ods { get; set; }
        public bool odr { get; set; }
    }

}
