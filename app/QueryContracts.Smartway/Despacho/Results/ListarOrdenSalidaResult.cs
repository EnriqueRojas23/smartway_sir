namespace QueryContracts.Smartway.Despacho.Results
{
    using QueryContracts.Common;
    using System;
    using System.Collections.Generic;

    public class ListarOrdenSalidaResult : QueryResult
    {
        public IEnumerable<ListarOrdenSalidaDto> Hits { get; set; }
    }

    public class ListarOrdenSalidaDto
    {
        public long iddocumentosalida { get; set; }
        public string numerodocumento { get; set; }
        public int idcliente { get; set; }
        public int idtiposalida { get; set; }
        public DateTime fechahoraregistro { get; set; }
        public bool activo { get; set; }
        public int idusuarioregistro { get; set; }
        public string nombre { get; set; }
    }

}