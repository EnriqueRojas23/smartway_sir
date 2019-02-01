using Domain.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;

namespace Domain.Smartway.Despacho
{
    public class GuiaRemisionDetalle : Entity
    {
        [Key]
        public long idguiadetalle { get; set; }
        public string codigo { get; set; }
        public string descripcion { get; set; }
        public int cantidad { get; set; }
        public long idguiaremision { get; set; }
        public long idordenservicio { get; set; }
      
    }
}
