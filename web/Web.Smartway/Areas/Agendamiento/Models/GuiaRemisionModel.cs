using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Smartway.Areas.Agendamiento.Models
{
    public class GuiaRemisionModel
    {
        public long? idguiaremision { get; set; }
        public string numeroguia { get; set; }
        public string codigoorigen { get; set; }
        public string direccionorigen { get; set; }
        public string codigodestino { get; set; }
        public string direcciondestino { get; set; }
        public string descripcion { get; set; }
        public DateTime fechaguiaremision { get; set; }
        public int iddestinatario { get; set; }
        public int idsucursalorigen { get; set; }
        public int idsucursaldestino { get; set; }

        public int idestado { get; set; }

        public string fechainicio { get; set; }
        public string fechafin { get; set; }
        public int __tipooperacion { get; set; }
        public string destinatario { get; set; }
        public int idusuarioregistro { get; set; }
        public int idtransportista { get; set; }

    }
    public class GuiaRemisionDetalleModel
    {

        public long? idguiadetalle { get; set; }
        public long idguiaremision { get; set; }
        public long idordenservicio { get; set; }
        public string codigo { get; set; }
        public string descripcion { get; set; }
        public int cantidad { get; set; }
    }
}