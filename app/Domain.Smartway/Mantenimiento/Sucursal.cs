using Domain.Common;
using System;
using System.ComponentModel.DataAnnotations;

namespace Domain.Smartway.Mantenimiento
{
    public class Sucursal : Entity
    {
        [Key]
        public int idsucursal { get; set; }

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
    }
}