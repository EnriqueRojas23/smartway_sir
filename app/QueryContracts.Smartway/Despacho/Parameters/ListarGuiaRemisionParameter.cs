
namespace QueryContracts.Smartway.Despacho.Parameters
{
    using QueryContracts.Common;

    public class ListarGuiaRemisionParameter : QueryParameter
    {
        public int? idsucursalorigen { get; set; }
        public int? idsucursaldestino { get; set; }
        public int? idestado { get; set; }
  
    }
}


