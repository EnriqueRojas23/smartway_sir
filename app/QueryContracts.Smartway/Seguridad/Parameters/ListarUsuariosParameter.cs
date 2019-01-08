

using QueryContracts.Common;
namespace QueryContracts.Smartway.Seguridad.Parameters
{
    public class ListarUsuariosParameter : QueryParameter
    {
        public int? rol_int_id { get; set; }
        public string usr_str_nombre_apellido { get; set; }
        public string usr_str_red { get; set; }
    }
}
