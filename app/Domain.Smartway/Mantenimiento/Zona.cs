

using Domain.Common;
using System.ComponentModel.DataAnnotations;
namespace Domain.Smartway.Mantenimiento
{
    public class Zona : Entity
    {
        [Key]
        public int idzona { get; set; }
        public string nombre { get; set; }
        
        public bool activo { get; set; }

    }
}
