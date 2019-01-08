

using CommandContracts.Common;
using System;
    
namespace CommandContracts.Smartway.Agendamiento
{
    public class EliminarIncidenciaEvaluacionCommand : Command
    {
        public long idincidencia { get; set; }
    }
}
