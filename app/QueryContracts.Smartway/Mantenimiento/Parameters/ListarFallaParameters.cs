
using QueryContracts.Common;
using System;
namespace QueryContracts.Smartway.Mantenimiento.Parameters
{
    public class ListarFallaParameters : QueryParameter
    {
        public int? idcategoriafalla { get; set; }
        public int? idfabricante { get; set; }

    }
}
