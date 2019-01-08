

using CommandContracts.Common;
using System;

namespace CommandContracts.Smartway.Agendamiento
{
    public class InsertarActualizarAccesorioIncidenciaCommand : Command
    {
        public string idsaccesorios { get; set; }
        public long idincidencia { get; set; }

    }
}
