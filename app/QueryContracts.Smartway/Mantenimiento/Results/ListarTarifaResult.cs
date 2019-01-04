using QueryContracts.Common;
using System;
using System.Collections.Generic;
namespace QueryContracts.Smartway.Mantenimiento.Results
{
    public class ListarTarifaResult : QueryResult
    {
        public IEnumerable<ListarTarifaDto> Hits { get; set; }
    }
    public class ListarTarifaDto
    {
        public int idtarifa { get; set; }
        public int idpartner { get; set; }
        public int idmoneda { get; set; }
        public string moneda { get; set; }
        public decimal? costo { get; set; }
        public decimal? diagnostico { get; set; }
        public decimal? revision { get; set; }
        public int idtipoproducto { get; set; }
        public int idtipotarifa { get; set; }
        public string tipoproducto { get; set; }
        public string tipotarifa { get; set; }
        public int idnivelreparacion { get; set; }
        public string nivelreparacion { get; set; }
        public bool garantia { get; set; }


    }
}


