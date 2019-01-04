

using Domain.Common;
using System.ComponentModel.DataAnnotations;
namespace Domain.Smartway.Seguridad
{
    public class SistemaRol : Entity
    {
      [Key]
      public int rol_int_id {get;set;}
      public int sis_int_id { get; set; }

    }
}
