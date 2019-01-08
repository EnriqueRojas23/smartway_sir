
using QueryContracts.Common;
using System;
namespace QueryContracts.Smartway.Mantenimiento.Parameters
{
    public class ListarProductosParameters : QueryParameter
    {
        public string codigo { get; set; }
        public string  descripcion { get; set; }
        public int? idtipoproducto { get; set; }
        public int? idfabricante { get; set; }
        public int? idmodelo { get; set; }
        public bool? repuesto { get; set; }



    }
}
