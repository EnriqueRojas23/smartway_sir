using CommandContracts.Common;
using System;

namespace CommandContracts.Smartway.Mantenimiento
{
    public class InsertarActualizarSucursalCommand : Command
    {
        public int? idsucursal { get; set; }
        public string codigo { get; set; }
        public string nombre { get; set; }
        public int idtiposucursal { get; set; }
        public int? idpartner { get; set; }
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
        public DateTime fechahoraregistro { get; set; }
        public int idusuarioregistro { get; set; }
        public int iddireccion { get; set; }
        public int __tipooperacion { get; set; }
    }
}