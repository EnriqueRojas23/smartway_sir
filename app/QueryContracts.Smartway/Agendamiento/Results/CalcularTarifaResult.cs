namespace QueryContracts.Smartway.Agendamiento.Incidencias.Results
{
    using QueryContracts.Common;
    using System;

    public class CalcularTarifaResult : QueryResult
    {
        public int idtarifa { get; set; }
        public int idtipotarifa { get; set; }
        public int idmoneda { get; set; }
        public bool garantia { get; set; }
        public int idnivelreparacion { get; set; }
        public string nivelreparacion { get; set; }
        public decimal costo { get; set; }
        public DateTime fechahoraregistro { get; set; }
        public int idusuarioregistro { get; set; }

    }
}
