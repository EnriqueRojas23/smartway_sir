

using QueryContracts.Common;
namespace QueryContracts.Smartway.Seguridad.Result
{
    public class ObtenerSistemaResult : EliminarPaginaResult 
    {
        public int pag_int_id { get; set; }
        public string pag_str_nombre { get; set; }
        public string pag_str_codmenu { get; set; }
        public string pag_str_descrip { get; set; }
        public string pag_str_url { get; set; }
        public bool pag_bit_activo { get; set; }

    }
}
