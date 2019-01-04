using QueryContracts.Common;
using System;
using System.Collections.Generic;
namespace QueryContracts.Smartway.Mantenimiento.Results
{
    public class ListarReparacionRepuestoResult : QueryResult
    {
        public IEnumerable<ListarReparacionRepuestoDto> Hits { get; set; }
    }
    public class ListarReparacionRepuestoDto
    {
        public int idrepuestoreparacion { get; set; }
        public int idreparacion { get; set; }
        public string descripcion { get; set; }
    }
}


