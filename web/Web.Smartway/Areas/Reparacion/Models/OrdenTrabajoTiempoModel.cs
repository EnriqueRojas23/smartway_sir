    using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Web.Smartway.Areas.Agendamiento.Models;

namespace Web.Smartway.Areas.Reparacion.Models
{

    public class OrdenTrabajoTiempoModel 
    {
        public long? idordentrabajotiempo { get; set; }
        public long idordentrabajo { get; set; }
        public int idusuario { get; set; }
        public DateTime? fechahorainicio { get; set; }
        public DateTime? fechahorafin { get; set; }
        public int iteracion { get; set; }
        public int __tipoperacion { get; set; }

    }
   
}