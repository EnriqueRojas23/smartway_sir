namespace QueryContracts.Smartway.Agendamiento.Incidencias.Results
{
    using QueryContracts.Common;
    using System;

    public class ObtenerPropuestaResult : QueryResult
    {
        public int idpropuesta { get; set; }
        public string descripcion { get; set; }
        public bool requiereautorizacion { get; set; }
        public bool requieredocumentointerno { get; set; }
        public bool requierecotizacion { get; set; }
        public bool activo { get; set; }



    }
}
