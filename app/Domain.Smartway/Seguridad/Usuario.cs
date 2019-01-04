using Domain.Common;
using System;
using System.ComponentModel.DataAnnotations;
namespace Domain.Smartway.Seguridad
{
    public class Usuario : Entity
    {
        [Key]
        public int? usr_int_id { get; set; }

        public string usr_str_red { get; set; }
        public string usr_str_recordarpwd { get; set; }
        //public string usr_str_password { get; set; }
        public string usr_str_nombre { get; set; }
        public string usr_str_email { get; set; }
        public string usr_str_apellidos { get; set; }
        public Int16 usr_int_online { get; set; }
        public Int32 usr_int_numintentos { get; set; }
        public Int16 usr_int_cambiarpwd { get; set; }
        public Int16 usr_int_bloqueado { get; set; }
        public Int16 usr_int_aprobado { get; set; }
        public DateTime? usr_dat_ultfeclogin { get; set; }
        public DateTime? usr_dat_ultfecbloqueo { get; set; }
        public DateTime? usr_dat_fecvctopwd { get; set; }
        public DateTime? usr_dat_fecregistro { get; set; }
        public DateTime? usr_dat_fecvctousuario { get; set; }
        public string usr_str_tipoacceso { get; set; }
        public int? idcliente { get; set; }
        public int? idproveedor { get; set; }

        public bool callcenter { get; set; }
        public int idtipousuario { get; set; }
        public int? idsucursal { get; set; }
        public int? idpartner { get; set; }
        public string tiposproducto { get; set; }





    }
}
