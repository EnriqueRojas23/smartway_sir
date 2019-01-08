
using QueryContracts.Common;
using System;
namespace QueryContracts.Smartway.Mantenimiento.Parameters
{
    public class ListarDiagnosticoParameters : QueryParameter
    {
        public int? idcategoriareparacion { get; set; }
        public int? idfabricante { get; set; }
        public int? idtipoproducto { get; set; }
        public int? iddiagnostico { get; set; }
        public bool? garantia { get; set; }

    }
}
