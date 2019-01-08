
using QueryContracts.Common;
using System;
namespace QueryContracts.Smartway.Mantenimiento.Parameters
{
    public class ListarPartnerParameters : QueryParameter
    {
        public string numerodocumento { get; set; }
        public string razonsocial { get; set; }
    }
}
