

using QueryContracts.Common;
using System.Collections.Generic;
    
namespace QueryContracts.TYS.Facturacion.Results
{
    public class ListarDocumentosResult : QueryResult
    {
        public IEnumerable<ListarDocumentosDto> Hits { get; set; }
    }
    public class ListarDocumentosDto  
    {
        public int idnumerodocumento { get; set; }
        public int idtipocomprobante { get; set; }
        public string serie { get; set; }
        public string primernumero { get; set; }
        public string ultimonumero { get; set; }
        public int idusuarioautorizado { get; set; }
        public int idestacion { get; set; }
        public string tipodocumento { get; set; }
        public string usuario { get; set; }
        public string estacionorigen { get; set; }
    }
}
