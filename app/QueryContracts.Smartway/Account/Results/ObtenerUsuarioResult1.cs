using QueryContracts.Common;

namespace QueryContracts.Smartway.Account.Results
{
    public class ObtenerUsuarioResult1 : QueryResult
    {
        public int usr_int_id { get; set; }
        public string usr_str_nombre { get; set; }
        public string usr_str_apellidos { get; set; }
        public string usr_str_red { get; set; }
        public string usr_str_email { get; set; }
        public int usr_int_bloqueado { get; set; }
        public int usr_bit_aprobado { get; set; }
        public string usr_str_tipoacceso { get; set; }
        public string usr_str_tienda { get; set; }
        public int? ssis_int_id { get; set; }
        public string usr_str_dni { get; set; }
        public int? idcliente { get; set; }
        public bool callcenter { get; set; }
        public int idtipousuario { get; set; }
        public int idsucursal { get; set; }
        public int idpartner { get; set; }
        public string tiposproducto { get; set; }


    }
}

