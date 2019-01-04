

using QueryContracts.Common;
using System.Collections.Generic;
namespace QueryContracts.Smartway.Seguridad.Result
{
    public class BuscarPaginasResult : EliminarPaginaResult 
    {

        public IEnumerable<BuscarPaginasDto> Hits { get; set; }

    }
    public class BuscarPaginasDto
    {
        public int pag_int_id { get; set; }
        public string pag_str_codmenu { get; set; }
        public string pag_str_nombre { get; set; }
        public string pag_str_tipomenu { get; set; }
        public int pag_int_nivel { get; set; }
        public int pag_int_secuencia { get; set; }
        public string pag_str_controller { get; set; }
        public string pag_str_action { get; set; }
        public string pag_str_attributes { get; set; }
    }
}
