
using QueryContracts.Common;
using System;
namespace QueryContracts.Smartway.Mantenimiento.Parameters
{
    public class ListarReparacionParameters : QueryParameter
    {
        public int? idcategoriareparacion { get; set; }
        public int? idfabricante { get; set; }

        public int? idtipoproducto { get; set; }

        public int? idreparacion { get; set; }
    }
}
