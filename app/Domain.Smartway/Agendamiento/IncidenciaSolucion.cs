

using Domain.Common;
using System;
using System.ComponentModel.DataAnnotations;
namespace Domain.Smartway.Agendamiento
{
    public class IncidenciaSolucion : Entity
    {
        [Key]
        public long idincidenciasolucion { get; set; }
        public long idincidencia { get; set; }
        public int idpropuesta { get; set; }
        public bool clientesatisfecho { get; set; }
        public string observacion { get; set; }
        public int idestado { get; set; }
        public int idusuarioregistro { get; set; }
        public DateTime fechahoraregistro { get; set; }

    }
}
