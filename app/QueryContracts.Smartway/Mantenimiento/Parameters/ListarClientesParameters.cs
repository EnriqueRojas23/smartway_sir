
using QueryContracts.Common;
using System;
namespace QueryContracts.Smartway.Mantenimiento.Parameters
{
    public class ListarClientesParameters : QueryParameter
    {
        public string criterio { get; set; }
        public int? idtipodocumento {get;set;}
        public bool activo { get; set; }
        
    }
}
