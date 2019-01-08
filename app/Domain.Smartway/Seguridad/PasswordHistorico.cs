using System;
using System.ComponentModel.DataAnnotations;
namespace Domain.Smartway.Seguridad
{
    public class PasswordHistorico
    {
        [Key]
        public int pwd_int_id { get; set; }
        public int usr_int_id { get; set; }
        public string  pwd_str_guid { get; set; }
        public DateTime pwd_dat_registro { get; set; }
    }
}
