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
        public int idsucursalorigen { get; set; }
        public string descripcion { get; set; }
        public int idtipoguiaremision { get; set; }
        public string documentoreferencia { get; set; }
        public int idestado { get; set; }
        public int? idusuarioregistro { get; set; }
        public DateTime fechahoraregistro { get; set; }
        public int? idusuariorecojo { get; set; }
        public DateTime? fechahorarecojo { get; set; }
    }
}
