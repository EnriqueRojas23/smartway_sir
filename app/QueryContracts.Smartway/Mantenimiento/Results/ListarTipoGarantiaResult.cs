using QueryContracts.Common;
using System;
using System.Collections.Generic;
namespace QueryContracts.Smartway.Mantenimiento.Results
{
    public class ListarTipoGarantiaResult : QueryResult
    {
        public IEnumerable<ListarTipoGarantiaDto> Hits { get; set; }
    }
    public class ListarTipoGarantiaDto
    {
        public int idtipogarantia { get; set; }
        public string nombre { get; set; }
        public string descripcion { get; set; }
        public bool logica { get; set; }
        public bool venta { get; set; }
        public bool activo { get; set; }

    }
}


