using System;
using System.ComponentModel.DataAnnotations;

namespace Web.Smartway.Areas.Mantenimiento.Models
{
    public class SucursalModel
    {
        public int? idsucursal { get; set; }

        [Required]
        public string codigo { get; set; }

        public string nombre { get; set; }
        public int idtiposucursal { get; set; }

        public string tiposucursal { get; set; }
        public int? idpartner { get; set; }

        [Required]
        public int idpartner_search { get; set; }

        public string contacto { get; set; }
        public string telefono { get; set; }
        public string celular { get; set; }
        public string email { get; set; }
        public string idtipopago { get; set; }
        public string[] _tipopago { get; set; }
        public string tipopago { get; set; }
        public int idcondicionrecojo { get; set; }

        public string condicionrecojo { get; set; }
        public int idcondicionentrega { get; set; }
        public string condicionentrega { get; set; }
        public bool laboratoriocentral { get; set; }

        [Required]
        public bool reparacion { get; set; }

        public bool delivery { get; set; }
        public bool activo { get; set; }
        public int iddistrito { get; set; }
        public int iddireccion { get; set; }
        public string direccion { get; set; }
        public DateTime fechahoraregistro { get; set; }
        public int idusuarioregistro { get; set; }
        public int __tipooperacion { get; set; }
    }
}