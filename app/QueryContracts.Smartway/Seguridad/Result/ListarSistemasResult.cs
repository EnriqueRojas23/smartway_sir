
using QueryContracts.Common;
using System.Collections.Generic;
namespace QueryContracts.Smartway.Seguridad.Result
{
    public class ListarSistemasResult : EliminarPaginaResult
    {
        public IEnumerable<ListarSistemasDto> Hits { get; set; }
    }

    public class ListarSistemasDto
    {
        public int pag_int_id { get; set; }
        public string pag_str_codmenu { get; set; }
        public string pag_str_nombre { get; set; }
        public string pag_str_descrip { get; set; }
        public string pag_str_url { get; set; }
        public string pag_int_secuencia { get; set; }
    }

}
