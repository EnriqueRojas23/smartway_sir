using QueryContracts.Common;
using System.Collections.Generic;
namespace QueryContracts.Smartway.Mantenimiento.Results
{
    public class ListarDireccionClienteResult : QueryResult
    {
        public IEnumerable<ListarDireccionClienteDto> Hits { get; set; }
    }
    public class ListarDireccionClienteDto
    {
        public int iddireccion { get; set; }
        public string codigo { get; set; }
        public string direccion { get; set; }
        public string ubigeo { get; set; }
        public string provincia { get; set; }
        public string distrito { get; set; }
        public string departamento { get; set; }
        public int iddistrito { get; set; }
        public int iddepartamento { get;set; }
        public int idprovincia { get; set; }
        public bool activo { get; set; }
        public bool principal { get; set; }
        public bool puntopartida { get; set; }

    }
}


