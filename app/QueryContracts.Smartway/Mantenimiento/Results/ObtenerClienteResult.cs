

using QueryContracts.Common;
using System;
namespace QueryContracts.Smartway.Mantenimiento.Results
{
    public class ObtenerClienteResult : QueryResult
    {
        public int idcliente { get; set; }
        public string nombre { get; set; }
        public string numerodocumento { get; set; }
        public string nombrecorto { get; set; }
        public string direccion { get; set; }
        public int iddireccion { get; set; }
        public int idubigeo { get; set; }
        public decimal lineacredito { get; set; }
        public string rutalogo { get; set; }
        public bool activo { get; set; }
        public int idmonedalinea { get; set; }
        public string ubigeo { get; set; }
        public string codigo { get; set; }
        public int idtipodocumento { get; set; }
        public string telefono { get; set; }
        public string email { get; set; }
        public string celular { get; set; }
        public int idsexo { get; set; }
    }
}
