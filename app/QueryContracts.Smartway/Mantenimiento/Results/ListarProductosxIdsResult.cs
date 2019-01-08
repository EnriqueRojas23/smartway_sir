using QueryContracts.Common;
using System;
using System.Collections.Generic;
namespace QueryContracts.Smartway.Mantenimiento.Results
{
    public class ListarProductosxIdsResult : QueryResult
    {
        public IEnumerable<ListarProductosxIdsDto> Hits { get; set; }
    }
    public class ListarProductosxIdsDto
    {
        public int idproducto { get; set; }
        public string codigoproducto { get; set; }
        public string descripcioncorta { get; set; }
        public string descripcionlarga { get; set; }
        public bool repuesto { get; set; }
        public int idtipoproducto { get; set; }
        public string tipoproducto { get; set; }
        public int idfabricante { get; set; }
        public string fabricante { get; set; }
        public int idmodelo { get; set; }
        public string modelo { get; set; }
        public int idfamilia { get; set; }
        public decimal peso { get; set; }
        public decimal volumen { get; set; }
        public int idmoneda { get; set; }
        public string moneda { get; set; }
        public decimal preciounitario { get; set; }
        public bool activo { get; set; }
        public int idrequisitoascanear { get; set; }
    }
}


