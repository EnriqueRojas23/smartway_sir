namespace QueryContracts.Smartway.Agendamiento.Incidencias.Results
{
    using QueryContracts.Common;
    using System;
    using System.Collections.Generic;

    public class ListarIncidenciaResult : QueryResult
    {
        public IEnumerable<ListarIncidenciaDto> Hits { get; set; }
    }
    public class ListarIncidenciaDto
    {
        public long idincidencia { get; set; }
        public DateTime fechahoraregistro { get; set; }
        public string tipoincidencia { get; set; }
        public bool incidenciagarantia { get; set; }
        public bool engarantia { get; set; }
        public int idcita { get; set; }
        public string sucursal { get; set; }
        public string cliente { get; set; }
        public string usuarioregistro { get; set; }
        public string estado { get; set; }
        public string numerocomprobante { get; set; }
        public string codigoproducto { get; set; }
        public string descripcionlarga { get; set; }
        public string numeroincidencia { get; set; }
    }

}
