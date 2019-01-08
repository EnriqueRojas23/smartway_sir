

using QueryContracts.Common;
namespace QueryContracts.Smartway.Seguridad.Result
{
    public class ObtenerDatosBasicosUsuarioResult : EliminarPaginaResult
    {
        public int usr_int_id { get; set; }
        public string usr_str_nombre { get; set; }
        public string usr_str_apellidos { get; set; }
        public string usr_str_red { get; set; }
        public string usr_str_email { get; set; }
    }
}
