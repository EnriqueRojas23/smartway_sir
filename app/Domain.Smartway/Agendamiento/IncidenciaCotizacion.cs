

using Domain.Common;
using System;
using System.ComponentModel.DataAnnotations;
namespace Domain.Smartway.Agendamiento
{
    public class IncidenciaCotizacion : Entity
    {
        [Key]
        public long idcotizacion { get; set; }
        public long idincidencia { get; set; }
        public bool repararotrolaboratorio { get; set; }
        public bool delivery { get; set; }
        public int idsucursalreparacion { get; set; }
        public int idestado { get; set; }
        public int idmoneda { get; set; }
        public decimal subtotal { get; set; }
        public decimal igv { get; set; }
        public decimal total { get; set; }
        public DateTime fechahoraregistro { get; set; }
        public int idusuarioregistro { get; set; }
        public int iddirecciondelivery { get; set; }

    }
}
