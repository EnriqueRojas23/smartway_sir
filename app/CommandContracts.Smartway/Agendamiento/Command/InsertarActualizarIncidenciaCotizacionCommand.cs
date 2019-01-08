﻿

using CommandContracts.Common;
using System;

namespace CommandContracts.Smartway.Agendamiento
{
    public class InsertarActualizarIncidenciaCotizacionCommand : Command
    {
        public long? idcotizacion { get; set; }
        public long idincidencia { get; set; }
        public bool repararotrolaboratorio { get; set; }
        public bool delivery { get; set; }
        public int iddirecciondelivery { get; set; }
        public int idsucursalreparacion { get; set; }
        public int idestado { get; set; }
        public int idmoneda { get; set; }
        public decimal subtotal { get; set; }
        public decimal igv { get; set; }
        public decimal total { get; set; }
        public DateTime fechahoraregistro { get; set; }
        public int idusuarioregistro { get; set; }



    }
}