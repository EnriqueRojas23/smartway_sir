﻿

using Domain.Common;
using System;
using System.ComponentModel.DataAnnotations;
namespace Domain.Smartway.Agendamiento
{
    public class IncidenciaCotizacionDetalle : Entity
    {
        [Key]
        public long? idcotizaciondetalle { get; set; }
        public long idcotizacion { get; set; }
        public string descripcion { get; set; }
        public int iddiagnostico { get; set; }
        public int idreparacion { get; set; }
        public int idrepuesto { get; set; }
        public decimal costo { get; set; }

    }
}
