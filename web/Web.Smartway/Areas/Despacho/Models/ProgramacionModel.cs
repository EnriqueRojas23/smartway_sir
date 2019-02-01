    using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Smartway.Areas.Despacho.Models
{

    public class ProgramacionDetalleModel
    {
        public int? idprogramaciondetalle { get; set; }
        public int idprogramacion { get; set; }
        public int idguia { get; set; }
    }
    public class ProgramacionModel
    {
        public int search_idsucursalorigen { get; set; }
        public int search_idsucursaldestino { get; set; }

        public int searchmodal_idsucursalorigen { get; set; }
        public int searchmodal_idsucursaldestino { get; set; }

        public string direccionorigen { get; set; }
        public string direcciondestino { get; set; }
        public string numeroguia { get; set; }
        public int iddestinatario { get; set; }

        public int? idprogramacion { get; set; }
        public string numero { get; set; }
        public string sucursalorigen { get; set; }
        public string sucursaldestino { get; set; }
        public string razonsocial { get; set; }
        public DateTime? fecharecojo { get; set; }
        public string usuarioprogramacion { get; set; }
        public string estado { get; set; }
        public int idestado { get; set; }
        public int idtransportista { get; set; }
        public DateTime fechahoraregistro { get; set; }

        public DateTime fechainicio { get; set; }
        public DateTime fechafin { get; set; }

        public DateTime fechaemision { get; set; }

        public int idsucursalorigen { get; set; }
        public int idsucursaldestino { get; set; }
        public int idusuarioregistro { get; set; }

        public int __tipooperacion { get; set; }
    }
    
}