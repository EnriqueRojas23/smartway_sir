

using QueryContracts.Common;
using System;
namespace QueryContracts.Smartway.Mantenimiento.Results
{
    public class ObtenerValorTablaResult : QueryResult
    {
        public int idvalortabla { get; set; }
        public string valor { get; set; }
        public int idmaestrotabla { get; set; }
        public bool activo { get; set; }
        public int orden { get; set; }
    }
}
