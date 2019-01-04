namespace QueryContracts.Smartway.Reparacion.Results
{
    using QueryContracts.Common;
    using System;

    public class ObtenerOrdenTrabajoResult : QueryResult
    {
        public long idordentrabajo { get; set; }
        public long idordenserviciotecnico { get; set; }
        public string numeroordentrabajo { get; set; }
        public DateTime fechahoraasignacion { get; set; }
        public long idordentrabajotiempo { get; set; }

        public string serie { get; set; }
        public string imei { get; set; }
        public string mac { get; set; }

        public string descripcion { get; set; }
    }
}
