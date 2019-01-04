using Domain.Common;
using System.ComponentModel.DataAnnotations;

namespace Domain.Smartway.Seguridad
{
    public class SistemaRolUsuario : Entity
    {
        [Key]
        public int sis_int_id { get; set; }

        [Key]
        public int usr_int_id { get; set; }

        [Key]
        public int rol_int_id { get; set; }
        public bool rol_bit_prin { get; set; }

    }
}
