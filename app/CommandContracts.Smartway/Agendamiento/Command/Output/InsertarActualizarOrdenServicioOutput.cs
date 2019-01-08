

using CommandContracts.Common;
namespace CommandContracts.Smartway.Agendamiento.Output
{
    public class InsertarActualizarOrdenServicioOutput : CommandResult
    {
        public long idordenservicio { get; set; }
        public string numeroordenservicio { get; set; }
    }
}
