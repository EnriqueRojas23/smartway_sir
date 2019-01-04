using Domain.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;

namespace Domain.Smartway.Inventario
{
    public class DocumentoRecepcionDetalle  : Entity
    {
        [Key]
        public long iddocumentorecepciondetalle { get; set; }
        public long iddocumentorecepcion { get; set; }
        public string numeropallet { get; set; }
        public string caja { get; set; }
        public bool repuesto { get; set; }
        public int idtipoproducto { get; set; }
        public int fila { get; set; }
        public int idproducto { get; set; }
        public string serie { get; set; }
        public string imei { get; set; }
        public int idmodelo { get; set; }
        public string mac { get; set; }
        public int cantidad { get; set; }
        public DateTime fechahorapersonalizacion { get; set; }
        public int idusuariopersonalizacion { get; set; }
    }
}
