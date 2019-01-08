namespace QueryContracts.Smartway.Reparacion.Results
{
    using QueryContracts.Common;
    using System;

    public class ObtenerOrdenServicioResult : QueryResult
    {
        public long idordenserviciotecnico { get; set; }
        public long idordentrabajo { get; set; }
        public string numeroordenservicio { get; set; }
        public long idincidencia { get; set; }
        public int idcliente { get; set; }
        public int idestado { get; set; }
        public string numeroost { get; set; }
        public DateTime fechahoraasignacion { get; set; }
        public string tecnicoAsignado { get; set; }
        public DateTime? fechahorainicio { get; set; }
        public DateTime? fechahorafin { get; set; }
        public string accesorios { get; set; }
        public bool? cotizado { get; set; }
        public bool? engarantia { get; set; }
        public int idtipoordenservicio { get; set; }
        public int idproducto { get; set; }
        public string producto { get; set; }
        public int idpartner { get; set; }
        public int idtipoproducto { get; set; }
        public int iddocumentorecepcion { get; set; }
        public long idinventario { get; set; }
        public int? iddirecciondelivery { get; set; }
        public bool delivery { get; set; }

    }
}
