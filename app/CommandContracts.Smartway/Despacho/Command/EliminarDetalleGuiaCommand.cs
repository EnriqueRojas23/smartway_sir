

using CommandContracts.Common;
using System;
    
namespace CommandContracts.Smartway.Agendamiento
{
    public class EliminarDetalleGuiaCommand : Command
    {
        public long idguiadetalle { get; set; }
    }
}
