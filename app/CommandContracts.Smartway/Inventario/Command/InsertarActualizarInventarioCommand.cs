

using CommandContracts.Common;
using System;

namespace CommandContracts.Smartway.Inventario
{
    public class InsertarActualizarInventarioCommand : Command
    {
        public long? idinventario { get; set; }
        public int idalmacen { get; set; }
        public int idpartner { get; set; }
        public int iddocumentorecepcion { get; set; }
        public int idproducto { get; set; }
        public string serie { get; set; }
        public string imei { get; set; }
        public string mac { get; set; }
        public int cantidad { get; set; }
        public int idestado { get; set; }
        public DateTime fechahoraregistro { get; set; }
        public int idusuarioregistro { get; set; }
        public string ubicacion { get; set; }
        public string caja { get; set; }
        public string pallet { get; set; }
        public int __idoperacion { get; set; }


        public int? idalmacennuevo { get; set; }
        public int? idestadonuevo { get; set; }
        public int? cantidadnueva { get; set; }


    }
}
