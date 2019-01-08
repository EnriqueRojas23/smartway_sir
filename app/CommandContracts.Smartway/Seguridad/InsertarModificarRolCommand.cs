
using CommandContracts.Common;
namespace CommandContracts.Smartway.Seguridad
{
    public class InsertarModificarRolCommand : Command
    {
        public int? rol_int_id {get;set;}
        public string rol_str_descrip {get;set;}
        public string rol_str_alias {get;set;}
        public string rol_str_usuario {get;set;}
        public string rol_str_pass {get;set;}
        public bool rol_bit_publico { get; set; }
        public bool rol_bit_activo { get; set; }
    }
}
