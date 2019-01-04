
using QueryContracts.Common;
using System;
namespace QueryContracts.Smartway.Mantenimiento.Parameters
{
    public class ListarSucursalParameters : QueryParameter
    {
        public string Codigo { get; set; }
        public string Nombre { get; set; }
        public int? idtipopartner { get; set; }

        public int? idpartner { get; set; }
        
    }
}
