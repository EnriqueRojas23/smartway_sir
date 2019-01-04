

using Domain.Common;
using System.ComponentModel.DataAnnotations;
namespace Domain.Smartway.Seguridad
{
    public class SistemaRolPagina : Entity
    {
        [Key]
        public int srp_int_id { get; set; }
        public int sis_int_id { get; set; }
        public int? rol_int_id { get; set; }
        public int pag_int_id { get; set; }
        public string srp_str_codpermiso { get; set; }


    }
}
