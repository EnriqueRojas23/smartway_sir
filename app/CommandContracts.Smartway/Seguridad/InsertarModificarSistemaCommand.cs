

using CommandContracts.Common;
namespace CommandContracts.Smartway.Seguridad
{
    public class InsertarModificarSistemaCommand : Command
    {

        public int? sis_int_id { get; set; }
        public string sis_str_nombre { get; set; }
        public string sis_str_alias { get; set; }
        public string sis_str_aliasmenu { get; set; }
        public string sis_str_siglas { get; set; }
        public string sis_str_resumen { get; set; }
        public int sis_int_orden { get; set; }
        public bool sis_bit_activo { get; set; }





    }
}
