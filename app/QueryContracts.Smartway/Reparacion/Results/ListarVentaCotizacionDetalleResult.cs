

using QueryContracts.Common;
using System;
using System.Collections.Generic;
    
namespace QueryContracts.Smartway.Reparacion.Results
{
    public class ListarVentaCotizacionDetalleResult : QueryResult
    {
        public IEnumerable<ListarVentaCotizacionDetalleDto> Hits { get; set; }
    }
    public class ListarVentaCotizacionDetalleDto
    {
        public long idcotizaciondetalle { get; set; }
        public long idcotizacion { get; set; }
        public int idproducto { get; set; }
        public int cantidad { get; set; }
        public decimal costounitario { get; set; }
        public decimal descuentounitario { get; set; }
        public decimal costototal { get; set; }
        public int iddiagnostico { get; set; }
        public int idreparacion { get; set; }
        public string descripcion { get; set; }
        public string diagnostico { get; set; }
        public string reparacion { get; set; }
        public string repuesto { get; set; }
    }
}
