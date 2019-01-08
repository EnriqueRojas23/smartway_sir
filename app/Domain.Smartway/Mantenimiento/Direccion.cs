

using Domain.Common;
using System.ComponentModel.DataAnnotations;
namespace Domain.Smartway.Mantenimiento
{
    public class Direccion : Entity
    {
        [Key]
        public int iddireccion { get; set; }
        public string codigo { get; set; }
        public string direccion { get; set; }
        public int iddistrito { get; set; }
        public bool principal { get; set; }
        public int? idcliente { get; set; }
        public bool activo { get; set;  }


    }
}
