

using Domain.Common;
using System;
using System.ComponentModel.DataAnnotations;
namespace Domain.TYS.Seguimiento
{
    public class Diagnostico : Entity
    {
        [Key]
        public int iddiagnosticosmartway { get; set; }
        public string codigosmartway { get; set; }
        public string descripcion { get; set; }
        public int idcategoriareparacion { get; set; }
        public bool activo { get; set; }
        public bool garantia { get; set; }
        public bool adjuntarimagen { get; set; }
    }
}
