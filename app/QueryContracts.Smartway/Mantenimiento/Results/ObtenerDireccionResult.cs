

using QueryContracts.Common;
using System;
namespace QueryContracts.Smartway.Mantenimiento.Results
{
    public class ObtenerDireccionResult : QueryResult
    {
        public int iddireccion { get; set; }
        public string direccion { get; set; }
        public int iddistrito { get; set; }
        public string ubigeo { get; set; }
        public int iddepartamento { get; set; }
        public int idprovincia { get; set; }
    }
}
