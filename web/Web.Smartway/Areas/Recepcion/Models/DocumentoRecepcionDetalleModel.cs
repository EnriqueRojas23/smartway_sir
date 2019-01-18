using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Smartway.Areas.Recepcion.Models
{
    public class DocumentoRecepcionDetalleModel
    {
        //Necesario para la carga // No es un valor de base de datos.
        public int item { get; set; }


        public long? iddocumentorecepciondetalle { get; set; }
        public long iddocumentorecepcion { get; set; }

        public string codigoproducto { get; set; }
        public string descripcionlarga { get; set; }
        public string Tipo { get; set; }

        public string numeropallet { get; set; }
        public string caja { get; set; }
        public string ubicacion { get; set; }
        public bool repuesto { get; set; }
        public int idtipoproducto { get; set; }
        public int fila { get; set; }
        public int idproducto { get; set; }
        public string _cantidad_aux { get; set; }

        public string codigo { get; set; }
        public string modelo { get; set; }

        public int idfila { get; set; }
        public string serie { get; set; }
        public string imei { get; set; }
        public string mac { get; set; }
        public int idmodelo { get; set; }
        public int cantidad { get; set; }
        public DateTime fechahorapersonalizacion { get; set; }
        public int idusuariopersonalizacion { get; set; }
        public string pallet { get; set; }
        public string fabricante { get; set; }
        public int idalmacen { get; set; }




    }
}