

using Domain.Common;
using System.ComponentModel.DataAnnotations;
namespace Domain.Smartway.Mantenimiento
{
    public class RepuestoxProducto : Entity
    {
        [Key]
        public int idrepuestoxproducto { get; set; }
        public int idproducto { get; set; }
        public int idrepuesto { get; set; }
    }
}
