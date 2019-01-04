using QueryContracts.Common;
using System.Collections.Generic;

namespace QueryContracts.Smartway.Seguridad.Result
{
    public class ListarPaginasPadreResult : EliminarPaginaResult
    {
        public IEnumerable<ListarPaginasPadreDto> Hits { get; set; }
    }
    public class ListarPaginasPadreDto
    {
        public int pag_int_id { get; set; }
        public string pag_str_codmenu { get; set; }
        public string pag_str_nombre { get; set; }
    }
}
