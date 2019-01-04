using QueryContracts.Common;
using System;
using System.Collections.Generic;
namespace QueryContracts.Smartway.Mantenimiento.Results
{
    public class ListarGarantiaResult : QueryResult
    {
        public IEnumerable<ListarGarantiaDto> Hits { get; set; }
    }
    public class ListarGarantiaDto
    {
        public int idgarantia { get; set; }
        public int idpartner { get; set; }
        public int idfabricante { get; set; }
        public int idtipoproducto { get; set; }
        public int idtipogarantia { get; set; }
        public int periodo { get; set; }
        public bool documentocompra { get; set; }
        public bool reparacion { get; set; }
        public bool activo { get; set; }
        public DateTime fechahoraregistro { get; set; }
        public int idusuarioregistro { get; set; }
        public string fabricante { get; set; }
        public string tipoproducto { get; set; }
        public string tipogarantia { get; set; }


    }
}


