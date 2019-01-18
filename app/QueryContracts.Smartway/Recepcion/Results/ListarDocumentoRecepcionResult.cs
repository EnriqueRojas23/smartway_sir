

using QueryContracts.Common;
using System;
using System.Collections.Generic;
    
namespace QueryContracts.Smartway.Recepcion.Results
{
    public class ListarDocumentoRecepcionResult : QueryResult
    {
        public IEnumerable<ListarDocumentoRecepcionDto> Hits { get; set; }
    }
    public class ListarDocumentoRecepcionDto
    {
        public long iddocumentorecepcion { get; set; }
        public string TipoRecibo { get; set; }
        public string numerodocumento { get; set; }
        public string documentocliente { get; set; }
        public string dua { get; set; }
        public string numerofacturacomercial { get; set; }
        public DateTime? fechafacturacomercial { get; set; }
        public string guiaremision { get; set; }
        public string partner { get; set; }
        public string fabricante { get; set; }
        public DateTime fechahorarecepcion { get; set; }
        public DateTime fechahoraregistro { get; set; }
        public string UsuarioRegistro { get; set; }
        public string numeroordenservicio { get; set; }
        public string Origen { get; set; }

    }
}
