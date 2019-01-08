using QueryContracts.Common;
using System;
using System.Collections.Generic;
namespace QueryContracts.Smartway.Mantenimiento.Results
{
    public class ListarUbigeoResult : QueryResult
    {
        public IEnumerable<ListarUbigeoDto> Hits { get; set; }
    }
    public class ListarUbigeoDto
    {
        public int iddistrito { get; set; }
        public int idprovincia { get; set; }
        public int iddepartamento { get; set; }
        public string ubigeo { get; set; }


    }
}


