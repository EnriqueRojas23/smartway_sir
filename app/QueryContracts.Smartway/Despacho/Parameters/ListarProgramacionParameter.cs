
namespace QueryContracts.Smartway.Despacho.Parameters
{
    using QueryContracts.Common;
    public class ListarProgramacionParameter : QueryParameter
    {
        public int? idsucursalorigen { get; set; }
        public int? idsucursaldestino { get; set; }
        public string fechaini { get; set; }
        public string fechafin { get; set; }
        public int? idestado { get; set; }
    }
}


