using QueryContracts.Common;
using System;
using System.Collections.Generic;
namespace QueryContracts.Smartway.Mantenimiento.Results
{
    public class ListarReparacionResult : QueryResult
    {
        public IEnumerable<ListarReparacionDto> Hits { get; set; }
    }
    public class ListarReparacionDto
    {
        public int idreparacion { get; set; }
        public string codigosmartway { get; set; }
        public string descripcion { get; set; }
        public string categoriareparacion { get; set; }
        public string tiporeparacion { get; set; }
        public int idnivelreparacion { get; set; }
        public string nivelreparacionPOS { get; set; }
        public string nivelreparacionTELECOM { get; set; }
        public bool activo { get; set; }
        public string nivelreparacion { get; set; }
        public string fabricante { get; set; }
        public string tipoproducto { get; set; }


    }
}


