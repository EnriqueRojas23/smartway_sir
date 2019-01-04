

using CommandContracts.Common;
using System.Collections.Generic;
namespace CommandContracts.Smartway.Seguridad
{
    public class AsignarMenuOpcionRolCommand : Command
    {
        public string sis_str_sigla { get; set; }
        public int rol_int_id { get; set; }
        public IList<OpcionCommand> opc_obj_array { get; set; }
    }

    public class OpcionCommand
    {
        public int opc_int_id { get; set; }
        public bool opc_bit_seleccionado { get; set; }
        public string opc_str_permiso { get; set; }
    }
}
