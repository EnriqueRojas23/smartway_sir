

using CommandContracts.Common;
using System;

namespace CommandContracts.Smartway.Mantenimiento
{
    public class InsertarActualizarDiagnosticoCommand : Command
    {
        public int? iddiagnostico { get; set; }
        public string codigosmartway { get; set; }
        public string descripcion { get; set; }
        public int idtipoproducto { get; set; }
        public int idfabricante { get; set; }
        public int idtipodiagnostico { get; set; }
        public int idcategoriareparacion { get; set; }

    }
}
