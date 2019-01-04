

using Domain.Common;
using System;
using System.ComponentModel.DataAnnotations;
namespace Domain.Smartway.Agendamiento
{
    public class Incidencia : Entity
    {
        [Key]
        public long idincidencia { get; set; }
        public string numeroincidencia { get; set; }
        public int anioincidencia { get; set; }
        public int idtipoincidencia { get; set; }
        public int idtiposolucion { get; set; }
        public int? idsucursal { get; set; }
        public int? idsucursalventa { get; set; }
        public int idcliente { get; set; }
        public string descripcion { get; set; }
        public int idrequerimientocliente { get; set; }
        public int? idfalla { get; set; }
        public long? iddocumentocompra { get; set; }
        public int idproducto { get; set; }
        public string imei { get; set; }
        public string serie { get; set; }
        public int cantidad { get; set; } // que es cantidad?
        public decimal? descuento { get; set; }
        public decimal? total { get; set; }
        public bool? atendidaxcallcenter { get; set; }
        public int? idcita { get; set; }
        public int idestado { get; set; }
        public int idetapa { get; set; }
        public int idusuarioregistro { get; set; }
        public DateTime fechahoraregistro { get; set; }
        public bool incidenciagarantia { get; set; }

        public int idtipogarantia { get; set; }
        public int? periodogarantia { get; set; }   
        public bool engarantia { get; set; }
        public int idpartner { get; set; }
        public bool requiereevaluacion { get; set; }
        public int iddirecciondelivery { get; set; }
        public int idsucursalreparacion { get; set; }
        public byte[] partedelantera { get; set; }
        public byte[] parteposterior { get; set; }
        public byte[] partesuperior { get; set; }
        public byte[] parteinferior { get; set; }
        public byte[] partederecha { get; set; }
        public byte[] parteizquierda { get; set; }
        public bool activo { get; set; }
    }
}
