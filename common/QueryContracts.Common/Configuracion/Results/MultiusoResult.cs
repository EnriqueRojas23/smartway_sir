
using System;
using System.Collections.Generic;
namespace QueryContracts.Common.Configuracion.Results
{
    public class MultiusoResult : QueryResult
    {
        public IEnumerable<MultiusoDto> Hits { get; set; }
    }

    public class MultiusoDto
    {
        public int mlt_int_id { get; set; }
        public int mlt_int_id_padre { get; set; }
        public string mlt_str_nombre { get; set; }
        public string mlt_str_descripcion { get; set; }
        public string mlt_str_valor { get; set; }
        public string mlt_str_alcance { get; set; }
        public DateTime mlt_dat_fecha_creacion { get; set; }
        public string mlt_str_usuario_creacion { get; set; }

    }
}
