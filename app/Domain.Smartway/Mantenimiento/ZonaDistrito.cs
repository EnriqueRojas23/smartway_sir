

using Domain.Common;
using System.ComponentModel.DataAnnotations;
namespace Domain.Smartway.Mantenimiento
{
    public class ZonaDistrito : Entity
    {
        [Key]
        public int idzonadistrito { get; set; }
        public int iddistrito  { get; set; }
        public int idzona { get; set; }

    }
}
    