

using Domain.Common;
using System;
using System.ComponentModel.DataAnnotations;
namespace Domain.Smartway.Despacho
{
    public class ProgramacionDetalle : Entity
    {
        [Key]
        public int idprogramaciondetalle { get; set; }
        public int idprogramacion { get; set; }
        public int idguia { get; set; }
    }
}
