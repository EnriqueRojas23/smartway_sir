namespace QueryContracts.Smartway.Despacho.Results
{
    using QueryContracts.Common;
    using System;
    using System.Collections.Generic;

    public class ListarProgramacionResult : QueryResult
    {
        public IEnumerable<ListarProgramacionDto> Hits { get; set; }
    }

    public class ListarProgramacionDto
    {
        public int idprogramacion { get; set; }
        public string numero { get; set; }
        public string sucursalorigen { get; set; }
        public string sucursaldestino { get; set; }
        public string razonsocial { get; set; }
        public DateTime fecharecojo { get; set; }
        public string usuarioprogramacion { get; set; }
        public string estado { get; set; }
    }

}