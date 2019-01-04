
using QueryContracts.Common;
using System;
using System.Collections.Generic;
namespace QueryContracts.Smartway.Recepcion.Parameters
{
    public class InsertarDocumentoRecepcionDetalleParameter : QueryParameter
    {
        public List<InsertarDocumentoRecepcionDetalleDto> Hits { get; set; }
    }

    public class InsertarDocumentoRecepcionDetalleDto
    {
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
        public int idalmacen { get; set; }
    }
}
