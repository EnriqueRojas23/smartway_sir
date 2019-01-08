

using Domain.Common;
using System;
using System.ComponentModel.DataAnnotations;

namespace Domain.Smartway.Agendamiento
{
    public class LibroReclamaciones : Entity
    {
        [Key]
        public long idreclamo { get; set; }
        public string numeroreclamacion { get; set; }
        public int idsucursal { get; set; }
        public int idtiporeclamo { get; set; }
        public DateTime fechahorareclamo { get; set; }
        public int idusuarioregistro { get; set; }
        public int? idcondicionreclamo { get; set; }
        public string motivo { get; set; }
        public string detalle { get; set; }
        public int? tipoenviorespuesta { get; set; }
        public bool? aceptaregistrodatos { get; set; }
        public string respuesta { get; set; }
        public DateTime? fecharespuesta { get; set; }
        public bool? escaladoaindecopi { get; set; }
        public int? idsedeindecopi { get; set; }
        public int? idresponsable { get; set; }
        public DateTime? fechahorarecepcion { get; set; }
        public string respuestaaindecopi { get; set; }
        public int? diasrespuesta { get; set; }
        public long? idincidencia { get; set; }
        public int idestado { get; set; }   
    }
}
