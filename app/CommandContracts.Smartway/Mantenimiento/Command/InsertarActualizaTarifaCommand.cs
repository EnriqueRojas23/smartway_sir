

using CommandContracts.Common;
using System;

namespace CommandContracts.Smartway.Mantenimiento
{
    public class InsertarActualizarTarifaCommand : Command
    {
        public int? idtarifa { get; set; }
        public int idpartner { get; set; }
        public int idmoneda { get; set; }
        public int idtipotarifa { get; set; }
        public int idtipoproducto { get; set; }
        public bool garantia { get; set; }
        public int idnivelreparacion { get; set; }
        public decimal? costo { get; set; }
        public decimal? diagnostico { get; set; }
        public decimal? revision { get; set; }
        public decimal? tipotarifa { get; set; }
        public int idusuarioregistro { get; set; }
        public DateTime fechahoraregistro { get; set; }
        public bool activo { get; set; }
        public int __tipooperacion { get; set; }

    }
}
