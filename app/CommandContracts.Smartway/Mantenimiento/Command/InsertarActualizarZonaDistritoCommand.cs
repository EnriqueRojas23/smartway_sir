

using CommandContracts.Common;
using System.Collections.Generic;

namespace CommandContracts.Smartway.Mantenimiento
{
    public class InsertarActualizarZonaDistritoCommand : Command
    {
        public int? idzona { get; set; }
        public int? idzonadistrito { get; set; }
        public int? iddistrito { get; set; }
        public List<string> idsdistritos { get; set; } 

    }
}
