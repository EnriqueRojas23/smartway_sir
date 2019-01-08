
using Domain.Common;
using System.ComponentModel.DataAnnotations;
namespace Domain.Smartway.Seguridad
{
    public class UsuarioCliente : Entity
    {

        [Key]
        public long ucl_int_id { get; set; }
        public int usr_int_id { get; set; }
        public string ruc_str_numero { get; set; }
    }
}
