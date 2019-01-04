

using Domain.Common;
using System;
using System.ComponentModel.DataAnnotations;
namespace Domain.Smartway.Agendamiento
{
    public class IncidenciaEvaluacion : Entity
    {
        [Key]
        public long idevaluaciongarantia { get; set; }
        public long idincidencia { get; set; }
        public int idcondicion { get; set; }
        public bool valor { get; set; }
        public string observacion { get; set; }
        public int idusuarioregistro { get; set; }
        public DateTime fechahoraregistro { get; set; }

    }
}
