using QueryContracts.Common;
using System;
using System.Collections.Generic;
namespace QueryContracts.Smartway.Mantenimiento.Results
{
    public class ListarDiagnosticoResult : QueryResult
    {
        public IEnumerable<ListarDiagnosticoDto> Hits { get; set; }
    }
    public class ListarDiagnosticoDto
    {
        public int iddiagnostico { get; set; }
        public string codigosmartway { get; set; }
        public int idfabricante { get; set; }
        public string tipoproducto { get; set; }
        public string fabricante { get; set; }
        public string tipodiagnostico { get; set; }
        public string categoriareparacion { get; set; }
        public string descripcion { get; set; }
        public int idtipodiagnostico { get; set; }
        public int idcategoriareparacion { get; set; }
        public string tiposproducto { get; set; }
    }
}


