namespace QueryContracts.Smartway.Despacho.Results
{
    using QueryContracts.Common;
    using System;
    using System.Collections.Generic;

    public class ListarOrdenSalidaDetalleResult : QueryResult
    {
        public IEnumerable<ListarOrdenSalidaDetalleDto> Hits { get; set; }
    }

    public class ListarOrdenSalidaDetalleDto
    {
        public long idordensalidadetalle { get; set; }
        public int idproducto { get; set; }
        public int cantidad { get; set; }
        public string serie { get; set; }
        public DateTime fechahoraatencion { get; set; }
        public string imei { get; set; }
        public int idusuarioatencion { get; set; }
        public bool repuesto { get; set; }
        public string codigoproducto {get;set;}
        public string descripcionlarga { get; set; }
    }

}