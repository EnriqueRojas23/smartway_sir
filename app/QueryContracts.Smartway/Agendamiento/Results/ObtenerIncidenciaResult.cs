namespace QueryContracts.Smartway.Agendamiento.Incidencias.Results
{
    using QueryContracts.Common;
    using System;

    public class ObtenerIncidenciaResult : QueryResult
    {
        public long idincidencia { get; set; }
        public int idtipoincidencia { get; set; }
        public int idtiposolucion { get; set; }
        public bool incidenciagarantia { get; set; }
        public int idsucursal { get; set; }
        public int idcliente { get; set; }
        public string descripcion { get; set; }
        public int idrequerimientocliente { get; set; }
        public int idsintoma { get; set; }
        public int anioincidencia { get; set; }
        public string numeroincidencia { get; set; }
        public long iddocumentocompra { get; set; }
        public int idproducto { get; set; }
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
        public int idcita { get; set; }
        public int idestado { get; set; }
        public int idetapa { get; set; }
        public int idusuarioregistro { get; set; }
        public DateTime fechahoraregistro { get; set; }
        public int idsucursaldestino { get; set; }
        public int idfalla { get; set; }
        public string falla { get; set; }
        public string producto { get; set; }
        public string codigoproducto { get; set; }
        public string requerimientocliente { get; set; }
        public string nombrecliente { get; set; }
        public string celular { get; set; }
        public string email { get; set; }
        public string telefono { get; set; }
        public int idtipodocumento { get; set; }
        public string numerodocumento { get; set; }
        public string direccioncliente { get; set; }
        public string numerocomprobante { get; set; }
        public DateTime fechaemision { get; set; }
        public int idtipodocumentocompra { get; set; }
        public int idsucursalventa { get; set; }
        public int idtipoproducto { get; set; }
        public int idfabricante { get; set; }
        public int idtipogarantia { get; set; }
        public bool requiereevaluacion { get; set; }
        public int idpartner { get; set; }
        public string accesorios { get; set; }
        public long? idordenserviciotecnico { get; set; }
        public int iddirecciondelivery { get; set; }
        public string numeroordenservicio { get; set; }
        public int idsucursalreparacion { get; set; }

        public byte[] partedelantera { get; set; }
        public byte[] partesuperior { get; set; }
        public byte[] parteinferior { get; set; }
        public byte[] parteposterior { get; set; }
        public byte[] partederecha { get; set; }
        public byte[] parteizquierda { get; set; }

        //Solucion
        public long? idincidenciasolucion { get; set; }
        public int? idpropuesta { get; set; }
        public string observacionsolucion { get; set; }

    }
}
