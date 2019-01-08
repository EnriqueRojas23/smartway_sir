

using Domain.Common;
using System;
using System.ComponentModel.DataAnnotations;
namespace Domain.Smartway.Reparacion
{
    public class OrdenTrabajo : Entity
    {

        [Key]
        public long idordentrabajo { get; set; }
        public string numeroordentrabajo { get; set; }
        public int idtecnico { get; set; }
        public long idordenserviciotecnico { get; set; }
        public bool incidencia { get; set; }
        public int bounce { get; set; }
        public bool detenida { get; set; }
        public int idestado { get; set; }
        public DateTime fechahoraregistro { get; set; }
        public int idusuarioregistro { get; set; }
        public string descripcion { get; set; }

    }
}
