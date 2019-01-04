

using Domain.Common;
using System;
using System.ComponentModel.DataAnnotations;
namespace Domain.Smartway.Agendamiento
{
    public class AccesorioIncidencia : Entity
    {
        [Key]
        public int idincidenciaaccesorio { get; set; } 
        public long idincidencia { get; set; }
        public int idaccesorio { get; set; }

    }
}
