

using QueryContracts.Common;
using System;
namespace QueryContracts.Smartway.Mantenimiento.Results
{
    public class ObtenerZonaResult : QueryResult
    {
        public int? idzona { get; set; }
        public string zona { get; set; }
    }
}
