

using Domain.Common;
using System;
using System.ComponentModel.DataAnnotations;
namespace Domain.Smartway.Reparacion
{
    public class OrdenTrabajoTiempo : Entity
    {

        [Key]
        public long idordentrabajotiempo { get; set; }
        public long idordentrabajo { get; set; }
        public int idusuario { get; set; }
        public DateTime? fechahorainicio { get; set; }
        public DateTime? fechahorafin { get; set; }
    }
}
