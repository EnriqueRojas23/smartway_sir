

using CommandContracts.Common;
using System;

namespace CommandContracts.Smartway.Despacho
{
    public class InsertarActualizarGuiaRemisionCommand : Command
    {
        public long? idguiaremision { get; set; }
        public string numeroguia { get; set; }
        public int idsucursalorigen { get; set; }
        public int idsucursaldestino { get; set; }
        public string descripcion { get; set; }
        public int idtipoguiaremision { get; set; }
        public string documentoreferencia { get; set; }
        public int idestado { get; set; }
        public int idusuarioregistro { get; set; }
        public DateTime fechahoraregistro { get; set; }
        public int idusuariorecojo { get; set; }
        public DateTime fechahorarecojo { get; set; }
        public int __tipooperacion { get; set; }
        public DateTime fechaguiaremision { get; set; }
        public int idcliente { get; set; }
        public string direccionorigen { get; set; }
        public string direcciondestino { get; set; }

    }
}
