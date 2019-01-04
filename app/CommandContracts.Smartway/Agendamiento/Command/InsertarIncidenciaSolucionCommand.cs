

using CommandContracts.Common;
using System;

namespace CommandContracts.Smartway.Agendamiento
{
    public class InsertarIncidenciaSolucionCommand : Command
    {
        public long? idincidenciasolucion { get; set; }
        public long idincidencia { get; set; }
        public int idpropuesta { get; set; }
        public bool clientesatisfecho { get; set; }
        public string observacion { get; set; }
        public int idestado { get; set; }
        public int idusuarioregistro { get; set; }
        public DateTime fechahoraregistro { get; set; }


    }
}
