namespace QueryContracts.Smartway.Agendamiento.Incidencias.Results
{
    using QueryContracts.Common;
    using System;
    using System.Collections.Generic;

    public class ListarIncidenciaCotizacionResult : QueryResult
    {
        public IEnumerable<ListarIncidenciaCotizacionDto> Hits { get; set; }
    }
    public class ListarIncidenciaCotizacionDto
    {
        public long idcotizacion { get; set; }
        public long idincidencia { get; set; }
        public int repararotrolaboratorio { get; set; }
        public bool delivery { get; set; }
        public int iddirecciondelivery { get; set; }
        public int idsucursalreparacion { get; set; }
        public int idestado { get; set; }
        public int idmoneda { get; set; }
        public decimal subtotal { get; set; }
        public decimal igv { get; set; }
        public decimal total { get; set; }
        public DateTime fechahoraregistro { get; set; }
        public int idusuarioregistro { get; set; }
        public long idcotizaciondetalle { get; set; }
        public string descripcion { get; set; }
        public int iddiagnostico { get; set; }
        public int idreparacion { get; set; }
        public int idrepuesto { get; set; }
        public decimal costo { get; set; }
        public string diagnostico { get; set; }
        public string reparacion { get; set; }
        public string repuesto { get; set; }

    }

}
