

using CommandContracts.Common;
namespace CommandContracts.Smartway.Agendamiento.Output
{
    public class InsertarActualizarIncidenciaOutput : CommandResult
    {
        public long idincidencia { get; set; }  
        public string numeroincidencia { get; set; }
    }
}
