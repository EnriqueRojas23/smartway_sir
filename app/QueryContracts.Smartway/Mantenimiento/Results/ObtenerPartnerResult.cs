

using QueryContracts.Common;
using System;
namespace QueryContracts.Smartway.Mantenimiento.Results
{
    public class ObtenerPartnerResult : QueryResult
    {
        public int? idpartner { get; set; }
        public int? idtipopartner { get; set; }
        public string razonsocial { get; set; }
        public string nombrecorto { get; set; }
        public int? idtipodocumento { get; set; }
        public string numerodocumento { get; set; }
        public string contacto { get; set; }
        public string telefono { get; set; }
        public string celular { get; set; }
        public string email { get; set; }
        public int? idmoneda { get; set; }
        public decimal lineacredito { get; set; }
        public decimal lineaconsumida { get; set; }
        public int? idcondicionentrega { get; set; }
        public int? idcondicionrecojo { get; set; }
        public int? idcondicionpago { get; set; }
        public bool activo { get; set; }
        public int? iddireccion { get; set; }

    }
}
