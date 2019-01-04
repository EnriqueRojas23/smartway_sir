

using QueryContracts.Common;
using System;
namespace QueryContracts.Smartway.Mantenimiento.Results
{
    public class ObtenerSucursalResult : QueryResult
    {
        public int idsucursal { get; set; }
        public string codigo { get; set; }
        public string nombre { get; set; }
        public int idtiposucursal { get; set; }
        public int idpartner { get; set; }
        public string contacto { get; set; }
        public string telefono { get; set; }
        public string celular { get; set; }
        public string email { get; set; }
        public string idtipopago { get; set; }
        public int idcondicionrecojo { get; set; }
        public int idcondicionentrega { get; set; }
        public bool laboratoriocentral { get; set; }
        public bool reparacion { get; set; }
        public bool delivery { get; set; }
        public bool activo { get; set; }
        public string direccion { get; set; }
        public int iddireccion { get; set; }
        public int iddistrito { get; set; }
    }
}
