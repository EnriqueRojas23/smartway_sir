

using Domain.Common;
using System.ComponentModel.DataAnnotations;
namespace Domain.Smartway.Mantenimiento  
{
    public class Valortabla : Entity
    {
        [Key]
        public int idvalortabla { get; set; }
        public string valor { get; set; }
        public int idmaestrotabla { get; set; }
        public int orden { get; set; }
        public bool activo { get; set; }
    }
}
