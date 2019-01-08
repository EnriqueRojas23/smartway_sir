using CommandContracts.Common;
using System;
namespace CommandContracts.Smartway.Seguridad
{
    public class InsertarModificarUsuarioCommand : Command
    {
        public int? usr_int_id { get; set; }

        public string usr_str_red { get; set; }
        public string usr_str_nombre { get; set; }
        public string usr_str_email { get; set; }
        public string usr_str_apellidos { get; set; }
        public Int16 usr_int_online { get; set; }
        public Int16 usr_int_cambiarpwd { get; set; }
        public Int16 usr_int_bloqueado { get; set; }
        public Int16 usr_int_aprobado { get; set; }
        public DateTime? usr_dat_ultfecbloqueo { get; set; }
        public DateTime? usr_dat_fecvctopwd { get; set; }
        public DateTime? usr_dat_fecvctousuario { get; set; }
        public string usr_str_tipoacceso { get; set; }
        public bool callcenter { get; set; }
        public int idtipousuario { get; set; }
        public int? idsucursal { get; set; }
        public int? idpartner { get; set; }
        public int? idcliente { get; set; }
        public string tiposproducto { get; set; }

    }
}
