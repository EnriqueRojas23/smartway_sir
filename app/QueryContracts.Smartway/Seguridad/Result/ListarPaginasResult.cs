

using QueryContracts.Common;
using System.Collections.Generic;
namespace QueryContracts.Smartway.Seguridad.Result
{
    public class ListarPaginasResult : EliminarPaginaResult
    {
        public IEnumerable<ListarPaginasDto> Hits { get; set; }
    }
    public class ListarPaginasDto
    {
        public string pag_int_id { get; set; }
        public string pag_str_codmenu { get; set; }
        public string pag_str_codmenu_padre { get; set; }
        public string pag_str_nombre { get; set; }
        public string pag_str_descrip { get; set; }
        public string pag_str_url { get; set; }
        public string pag_str_tipomenu { get; set; }
        public string pag_int_nivel { get; set; }
        public string pag_int_secuencia { get; set; }
        public string pag_str_controller { get; set; }
        public string pag_str_action { get; set; }
        public string pag_str_attributes { get; set; }
        public bool pag_bit_externo {get;set;}
        public bool pag_bit_activo { get; set; }
    }
}
