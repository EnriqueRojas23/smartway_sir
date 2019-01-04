using QueryContracts.Common;
using System;
using System.Collections.Generic;
namespace QueryContracts.Smartway.Mantenimiento.Results
{
    public class ListarClientesResult : QueryResult
    {
        public IEnumerable<ListarClientesDto> Hits { get; set; }
    }
    public class ListarClientesDto
    {
        public int idcliente { get; set; }
        public string nombre { get; set; }
        public int idtipodocumento { get; set; }
        public string tipodocumento { get; set; }
        public string numerodocumento { get; set; }
        public string contacto { get; set; }
        public string telefono { get; set; }
        public string celular { get; set; }
        public string email { get; set; }
        public string sexo { get; set; }
        public bool activo { get; set; }
        public string ubigeo { get; set; }

        public int iddireccion { get; set; }
        public string direccion { get; set; }
        public int iddistrito { get; set; }

    }
}


