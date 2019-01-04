
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace Web.Smartway.Models.Account
{
    public class RegistroCuentaModel
    {
        public long? Usr_int_id { get; set; }
        public string Usr_str_nombre { get; set; }
        public string Usr_str_apellidos { get; set; }
        public string Usr_str_red { get; set; }
        public string Usr_str_email { get; set;}
        public int?   Usr_int_cambiarpwd { get; set; }
        public int?   Usr_int_aprobado { get; set; }
        public int?   Usr_int_bloqueado { get; set; }
        public int?   Usr_int_online { get; set; }
        public DateTime? Usr_dat_fecregistro { get; set; }
        public DateTime? Usr_dat_ultfecbloqueo { get; set; }
        public DateTime? Usr_dat_fecvctousuario { get; set; }
        public string Usr_str_tipoacceso { get; set; }
        public DateTime? Usr_dat_ultfeclogin { get; set; }
        public DateTime? Usr_dat_fecvctopwd { get; set; }
        public bool Usr_bool_cambiarpwd
        {
            set { Usr_int_cambiarpwd = value ? 1 : 0; }
            get { return !Usr_int_cambiarpwd.HasValue ? false : Convert.ToBoolean(Usr_int_cambiarpwd.Value); }
        }
        public bool Usr_bool_aprobado 
        {

            set { Usr_int_aprobado = value ? 1 : 0; }
            get { return !Usr_int_aprobado.HasValue ? false : Convert.ToBoolean(Usr_int_aprobado.Value); }
        }
        public bool Usr_bool_bloqueado
        {
            set { Usr_int_bloqueado = value ? 1 : 0; }
            get { return !Usr_int_bloqueado.HasValue ? false : Convert.ToBoolean(Usr_int_bloqueado.Value); }
        }
        public int?   ssis_int_id { get; set; }
        public string usr_str_tienda { get; set; }
        public string usr_str_dni { get; set; }
        public string usr_str_password { get; set; }
        public string usr_str_passwordcnf { get; set; }

        public SelectList ListaTipoCuenta
        {
            get
            {
                var lista = new SelectList(new List<SelectListItem>() 
                { 
                    new SelectListItem() { Selected = true, Text = "Cuenta Empleado", Value = "CE" },
                    new SelectListItem() { Selected = true, Text = "Cuenta Cliente",  Value = "AD" }

                }, "Value", "Text");

                return lista;
            }
        }
    }
}