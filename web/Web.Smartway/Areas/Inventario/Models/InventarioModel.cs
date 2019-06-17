using Componentes.Common.CustomAttributes;
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
        [Export(Cabecera = "Código", Orden = 1, Tamanio = 25, TipoExportacion = TipoExportacion.ExcelSimple)]
        public string codigoproducto { get; set; }
        [Export(Cabecera = "Producto", Orden = 2, Tamanio = 25, TipoExportacion = TipoExportacion.ExcelSimple)]
        public string descripcionlarga { get; set; }
        [Export(Cabecera = "Modelo", Orden = 3, Tamanio = 25, TipoExportacion = TipoExportacion.ExcelSimple)]
        public string modelo { get; set; }

        public string nombrealmacen { get; set; }
        [Export(Cabecera = "Serie", Orden = 4, Tamanio = 25, TipoExportacion = TipoExportacion.ExcelSimple)]
        public string serie { get; set; }
        [Export(Cabecera = "Imei", Orden = 5, Tamanio = 25, TipoExportacion = TipoExportacion.ExcelSimple)]
        public string imei { get; set; }
        [Export(Cabecera = "Mac", Orden = 6, Tamanio = 25, TipoExportacion = TipoExportacion.ExcelSimple)]
        public string mac { get; set; }
        [Export(Cabecera = "Cantidad", Orden = 7, Tamanio = 25, TipoExportacion = TipoExportacion.ExcelSimple)]
        public int cantidad { get; set; }
        public int idestado { get; set; }
        public int? idestadonuevo { get; set; }
        public int? cantidadnueva { get; set; }
        [Export(Cabecera = "Estado", Orden = 8, Tamanio = 25, TipoExportacion = TipoExportacion.ExcelSimple)]
        public string estado { get; set; }
        public DateTime fechahoraregistro { get; set; }
        public int idusuarioregistro { get; set; }
    

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