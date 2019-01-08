
using QueryContracts.Common;
using System.Collections.Generic;
namespace QueryContracts.Smartway.Seguridad.Result
{
    public class ListarRolesResult : EliminarPaginaResult
    {
        public IEnumerable<ListarRolesDto> Hits { get; set; }
    }

    public class ListarRolesDto
    {
        
        public int?  rol_int_id { get; set; }
        public string rol_str_descrip { get; set; }
        public string rol_str_alias { get; set; }
        public string rol_str_usuario { get; set; }
        public bool rol_bit_publico { get; set; }
        public bool rol_bit_activo { get; set; }

    }
}
