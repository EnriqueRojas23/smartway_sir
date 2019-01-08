

using CommandContracts.Common;
using System;

namespace CommandContracts.Smartway.Despacho
{
    public class InsertarActualizarProgramacionCommand : Command
    {
        public int? idprogramacion { get; set; }    
        public string numero { get; set; }
        public int idsucursalorigen { get; set; }
        public int idsucursaldestino { get; set; }
        public DateTime fecharecojo { get; set; }
        public int idtransportista { get; set; }
        public int idestado { get; set; }
        public int idusuarioregistro { get; set; }
        public DateTime fechahoraregistro { get; set; }
        public int __tipooperacion { get; set; }

    }
}
