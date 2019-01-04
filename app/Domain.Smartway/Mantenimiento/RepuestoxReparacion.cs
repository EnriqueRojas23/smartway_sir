

using Domain.Common;
using System.ComponentModel.DataAnnotations;
namespace Domain.Smartway.Mantenimiento
{
    public class RepuestoxReparacion : Entity
    {
        [Key]
        public int idrepuestoreparacion { get; set; }
        public int idrepuesto { get; set; }
        public int idreparacion { get; set; }
    }
}
