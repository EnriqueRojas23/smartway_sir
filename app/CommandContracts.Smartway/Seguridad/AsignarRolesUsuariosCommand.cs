

using CommandContracts.Common;
namespace CommandContracts.Smartway.Seguridad
{
    public class AsignarRolesUsuariosCommand : Command
    {
        public string sis_str_siglas { get; set; }
        public int usr_int_id { get; set; }
        public int[] rol_int_id_array { get; set; }
    
    }
}
