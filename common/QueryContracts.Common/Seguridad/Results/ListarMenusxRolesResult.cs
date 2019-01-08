

using System.Collections.Generic;
namespace QueryContracts.Common.Seguridad.Results
{
    public class ListarMenusxRolesResult : QueryResult
    {
        public IEnumerable<ListarMenusxRolesDto> Hits { get; set; }
    }

    public class ListarMenusxRolesDto
    {

        public int pag_int_id { get; set; }
        public string pag_str_codmenu { get; set; }
        public string pag_str_codmenu_padre { get; set; }
        public string pag_str_nombre { get; set; }
        public string pag_str_descrip { get; set; }
        public string pag_str_icono { get; set; }
        public string pag_str_url { get; set; }
        public string pag_str_tipomenu { get; set; }
        public int pag_int_nivel { get; set; }
        public int pag_int_secuencia { get; set; }
        public int rol_int_id { get; set; }
        public int sis_int_id { get; set; }
        public string srp_str_codpermiso { get; set; }
        public int srp_seleccion { get; set; }

        public string pag_str_controller { get; set; }
        public string pag_str_action {get; set;}
        public string pag_str_attributes { get; set; }


    }
}
