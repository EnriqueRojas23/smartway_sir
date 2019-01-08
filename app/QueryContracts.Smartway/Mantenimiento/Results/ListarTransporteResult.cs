

using QueryContracts.Common;
using System.Collections.Generic;

namespace QueryContracts.Smartway.Mantenimiento.Results
{
     public class ListarTransporteResult : QueryResult 
    {
        public IEnumerable<ListarTransporteDto> Hits { get; set; }

    }

    public class ListarTransporteDto
    {
        public int mot_int_id { get; set; }
        public string mot_str_nombMoto { get; set; }
        public int pro_int_id { get; set; }
        public string mot_str_estado { get; set; }
        public string mot_str_conductor { get; set; }
        public string mot_str_act { get; set; }
    }
}
