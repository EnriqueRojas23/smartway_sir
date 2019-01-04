
using QueryContracts.Common;
using System;
using System.Collections.Generic;
namespace QueryContracts.Smartway.Seguridad.Result
{
    public class ListarUsuariosResult : EliminarPaginaResult
    {
        public IEnumerable<ListarUsuariosDto> Hits { get; set; }
    }

    public class ListarUsuariosDto
    {
        
         public int usr_int_id { get; set; }
         public string usr_str_red { get; set; }
         public string usr_str_nombre  { get; set; }
         public string usr_str_apellidos { get; set; }
         public string usr_str_email { get; set; }
         public int? usr_int_bloqueado { get; set; }
         public int? usr_int_aprobado { get; set; }
         public DateTime? usr_dat_ultfeclogin { get; set; }
         public DateTime? usr_dat_ultfecbloqueo { get; set; }
         public DateTime? usr_dat_fecvctopwd { get; set; }
         public int? usr_int_numintentos { get; set; }
         public DateTime? usr_dat_fecregistro { get; set; }
         public string rol_str_alias { get; set; }
         public int?  nro_roles { get; set; }
         public string Activo { get; set; }
         public string usr_str_tipoacceso { get; set; }
        public string sucursal { get; set; }
        
    }
}
