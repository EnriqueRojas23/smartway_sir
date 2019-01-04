

using CommandContracts.Common;
using System;

namespace CommandContracts.Smartway.Mantenimiento
{
    public class InsertarActualizarReparacionCommand : Command
    {
        public int? idreparacion { get; set; }
        public string codigosmartway { get; set; }
        public string descripcion { get; set; }
        public int idtipoproducto { get; set; }
        public int idfabricante { get; set; }
        public int idcategoriareparacion { get; set; }
        public int idtiporeparacion { get; set; }
        public int idnivelreparacion { get; set; }
        public bool activo { get; set; }
        public DateTime fechahoraregistro { get; set; }
        public int idusuarioregistro { get; set; }

    }
}
