
using QueryContracts.Common;
using System;
namespace QueryContracts.Smartway.Recepcion.Parameters
{
    public class ListarDocumentoRecepcionParameters : QueryParameter
    {
        public String  fechahorainicio { get; set; }
        public String fechahorafin { get; set; }
        public string numeroordenservicio { get; set; }
    }
}
