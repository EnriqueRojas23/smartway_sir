

using CommandContracts.Common;
using System;

namespace CommandContracts.Smartway.Reparacion
{
    public class InsertarActualizarDocumentoRecepcionCommand : Command
    {
        public long? iddocumentorecepcion { get; set; }
        public string numerodocumento { get; set; }
        public string documentocliente { get; set; }
        public string dua { get; set; }
        public string numerofacturacomercial { get; set; }
        public DateTime? fechafacturacomercial { get; set; }
        public int idtiporecibo { get; set; }
        public string guiaremision { get; set; }
        public int idfabricante { get; set; }
        public int idpartner { get; set; }
        public int idorigen { get; set; }
        public bool activo { get; set; }
        public DateTime fechahoraregistro { get; set; }
        public DateTime fechahorarecepcion { get; set; }
        public int idusuarioregistro { get; set; }
        public long? idordenservicio { get; set; }

    }
}
