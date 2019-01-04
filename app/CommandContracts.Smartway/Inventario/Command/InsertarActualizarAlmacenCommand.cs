

using CommandContracts.Common;
using System;

namespace CommandContracts.Smartway.Inventario
{
    public class InsertarActualizarAlmacenCommand : Command
    {
        public int? idalmacen { get; set; }
        public string codigoalmacen { get; set; }
        public string nombrealmacen { get; set; }
        public int idsucursal { get; set; }
        public int idtipoalmacen { get; set; }
        public bool activo { get; set; }
        public int __tipooperacion { get; set; }

    }
}
