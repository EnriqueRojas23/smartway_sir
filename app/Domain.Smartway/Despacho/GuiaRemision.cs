using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Domain.Smartway.Despacho
{
    public class GuiaRemision : Entity
    {
        public long idguiaremision { get; set; }
        public string numeroguia { get; set; }
        public string descripcion { get; set; }
        public string documentoreferencia { get; set; }
        public int idestado { get; set; }
        public int? idusuarioregistro { get; set; }
        public DateTime fechahoraregistro { get; set; }
        public int? idusuariorecojo { get; set; }
        public DateTime? fechahorarecojo { get; set; }
        public int idcliente { get; set; }
        public DateTime fechaguiaremision { get; set; }
        public string direccionorigen { get; set; }
        public string direcciondestino { get; set; }
        public int iddestinatario { get; set; }
        public int idtransportista { get; set; }
    }
}
