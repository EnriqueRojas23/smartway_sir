using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Smartway.Areas.Despacho.Models
{
    public class OrdenSalidaModel
    {
        public long? iddocumentosalida { get; set; }
        public string numerodocumento { get; set; }
        public int idcliente { get; set; }
        public int idtiposalida { get; set; }
        public bool activo { get; set; }
        public int idproducto { get; set; }
        public DateTime fechahoraregistro { get; set; }
        public DateTime fechasalida { get; set; }
        public int idusuarioregistro { get; set; }
        public string archivo { get; set; }
        public string lote { get; set; }
        public IEnumerable<OrdenSalidaDetalleModel> detalles { get; set; }
        

    }
    public class OrdenSalidaDetalleModel 
    {
        public long idordensalidadetalle { get; set; }
        public int item { get; set; }
        public long idordensalida { get; set; }
        public long idordenservicio { get; set; }
        public string codigo { get; set; }
        public int idproducto { get; set; }
        public int cantidad { get; set; }
        public string serie { get; set; }
        public string imei { get; set; }
        public string mac { get; set; }
        public DateTime fechahoraatencion { get; set; }
        public int idusuarioatencion { get; set; }
        public bool repuesto { get; set; }
        public long idinventario { get; set; }
    }
}