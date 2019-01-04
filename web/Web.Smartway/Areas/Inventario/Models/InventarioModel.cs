using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Smartway.Areas.Inventario.Models
{
    public class InventarioModel
    {
        public long? idinventario { get; set; }
        public int idalmacen { get; set; }
        public int idpartner { get; set; }
        public long iddocumentorecepcion { get; set; }
        public int idproducto { get; set; }
        public string codigoproducto { get; set; }
        public string descripcionlarga { get; set; }
        public string nombrealmacen { get; set; }
        public string serie { get; set; }
        public string imei { get; set; }
        public string mac { get; set; }
        public int cantidad { get; set; }
        public int idestado { get; set; }
        public int? idestadonuevo { get; set; }
        public int? cantidadnueva { get; set; }
        public string estado { get; set; }
        public DateTime fechahoraregistro { get; set; }
        public int idusuarioregistro { get; set; }
        public string modelo { get; set; }

        public string pallet { get; set; }
        public string caja { get; set; }
        public string ubicacion { get; set; }

        public int idsucursal { get; set; }
        public int idsucursal_2 { get; set; }
        public int? idalmacennuevo { get; set; }
        public bool repuesto { get; set; }

        public int __idoperacion { get; set; }

    }
}