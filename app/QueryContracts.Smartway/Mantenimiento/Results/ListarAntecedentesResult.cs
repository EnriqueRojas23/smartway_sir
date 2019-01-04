namespace QueryContracts.Smartway.Mantenimiento.Results
{
    using QueryContracts.Common;
    using System;
    using System.Collections.Generic;

    public class ListarAntecedentesResult : QueryResult
    {
        public IEnumerable<ListarAntecedentesIncidenteDto> Clientes { get; set; }
        public IEnumerable<ListarAntecedentesIncidenteDto> Productos { get; set; }
    }

    public class ListarAntecedentesIncidenteDto
    {
        public long idincidencia { get; set; }
        public string descripcion { get; set; }
        public int anioincidencia { get; set; }
        public string numeroincidencia { get; set; }
        public string imei { get; set; }
        public string serie { get; set; }
        public string tipogarantia { get; set; }
        public int periodogarantia { get; set; }
        public bool engarantia { get; set; }
        public string ultimoestado { get; set; }
        public int cantidad { get; set; }
        public decimal descuento { get; set; }
        public decimal total { get; set; }
        public bool enviarareparar { get; set; }
        public string firmacliente { get; set; }
        public bool atendidaxcallcenter { get; set; }
        public string fechahoraregistro { get; set; }
        public int idfalla { get; set; }
        public string falla { get; set; }
        public string producto { get; set; }
        public string codigoproducto { get; set; }
        public string requerimientocliente { get; set; }
        public string nombrecliente { get; set; }
        public string celular { get; set; }
        public string email { get; set; }
        public string telefono { get; set; }
        public string numerodocumento { get; set; }
        public string direccioncliente { get; set; }
        public string numerocomprobante { get; set; }
        public DateTime fechaemision { get; set; }
        public bool requiereevaluacion { get; set; }
        public string accesorios { get; set; }
        public string numeroordenservicio { get; set; }

    }
    

}