

using Domain.Common;
using System;
using System.ComponentModel.DataAnnotations;
namespace Domain.Smartway.Reparacion
{
    public class OrdenTrabajoDetalle : Entity
    {

        [Key]
        public long idordentrabajodetalle { get; set; }
        public long idordentrabajo { get; set; }
        public string descripcion { get; set; }
        public int iddiagnostico { get; set; }
        public int idreparacion { get; set; }
        public int idrepuesto { get; set; }
        public decimal costo { get; set; }
        public bool servicio { get; set; }
        public long? idservicioasociado { get; set; }
        public bool activo { get; set; }
        public long? idinventario { get; set; }

    }
}
