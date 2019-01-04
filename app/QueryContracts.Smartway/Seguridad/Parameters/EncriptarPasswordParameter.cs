
using QueryContracts.Common;
namespace QueryContracts.Smartway.Seguridad.Parameters
{
    public class EncriptarPasswordParameter : QueryParameter
    {
        public int usr_int_id { get; set; }
        public string usr_str_password { get; set; }
    }
}
