

using Domain.Common;
using System;
using System.ComponentModel.DataAnnotations;
namespace Domain.TYS.Seguimiento
{
    public class DiagnosticoxTipoProducto : Entity
    {
        [Key]
        public int iddiagnosticotipoproducto { get; set; }
        public int iddiagnosticosmartway { get; set; }
        public int idtipoproducto { get; set; }
       

    }
}
