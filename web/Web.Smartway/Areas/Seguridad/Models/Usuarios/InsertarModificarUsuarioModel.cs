
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.Smartway.DataAccess.Seguridad;

namespace Web.Smartway.Areas.Seguridad.Models.Usuarios
{
    public class InsertarModificarUsuarioModel
    {
        public int? Usr_int_id { get; set; }

        [Display(Name = "Nombres:")]
        [Required]
        public string Usr_str_nombre { get; set; }

        [Display(Name = "Apellidos:")]
        [Required]
        public string Usr_str_apellidos { get; set; }

        [Display(Name = "Usuario:")]
        [Required]
        public string Usr_str_red { get; set; }

        [Display(Name = "Correo:")]
        [Required]
        public string Usr_str_email { get; set; }

        public string usr_str_tienda { get; set; }
        public int? Usr_int_cambiarpwd { get; set; }
        public int? Usr_int_aprobado { get; set; }
        public int? Usr_int_bloqueado { get; set; }
        public int? Usr_int_online { get; set; }
        public DateTime? Usr_dat_fecregistro { get; set; }
        public DateTime? Usr_dat_ultfecbloqueo { get; set; }
        public string usr_str_password { get; set; }
        public int ssis_int_id { get; set; }
        public string numerodocumento { get; set; }
        public DateTime? Usr_dat_fecvctousuario { get; set; }

        [Display(Name = "Tipo de Acceso:")]
        public string usr_str_tipoacceso { get; set; }
        public int? idcliente { get; set; }
        public int? idproveedor { get; set; }

        [Display(Name = "Tipo Usuario:")]
        [Required]
        public int idtipousuario { get; set; }
        public int idsucursal { get; set; }
        public int idpartner { get; set; }
        public bool callcenter { get; set; }
        public DateTime? Usr_dat_ultfeclogin { get; set; }
        public string[] _tiposproducto { get; set; }
        public string tiposproducto { get; set; }



        [Display(Name = "Fecha Vencimiento Password")]
        public DateTime? Usr_dat_fecvctopwd { get; set; }

        //[Display(Name = "Sistema")]
        //public int? Sis_int_id { get; set; }

        [Display(Name = "Cambiar Password ")]
        public bool Usr_bool_cambiarpwd
        {
            set { Usr_int_cambiarpwd = value ? 1 : 0; }
            get { return !Usr_int_cambiarpwd.HasValue ? false : Convert.ToBoolean(Usr_int_cambiarpwd.Value); }
        }

        [Display(Name = "Usuario Aprobado ")]
        public bool Usr_bool_aprobado 
        {

            set { Usr_int_aprobado = value ? 1 : 0; }
            get { return !Usr_int_aprobado.HasValue ? false : Convert.ToBoolean(Usr_int_aprobado.Value); }
        }

        [Display(Name = "Usuario Bloqueado ")]
        public bool Usr_bool_bloqueado
        {
            set { Usr_int_bloqueado = value ? 1 : 0; }
            get { return !Usr_int_bloqueado.HasValue ? false : Convert.ToBoolean(Usr_int_bloqueado.Value); }
        }

        public SelectList ListaModoAutenticacion
        {
            get
            {
                var lista = new SelectList(new List<SelectListItem>() 
                { 
                    new SelectListItem() { Selected = true, Text = "Interno", Value = "1" },
                    new SelectListItem() { Selected = true, Text = "Externo", Value = "2" }

                }, "Value", "Text");

                return lista;
            }
        }


        public SelectList ListaSistemasActivos
        {
            get 
            {
                var lista = new SelectList(SistemaData.ListarSistemas(), "sis_int_id", "sis_str_alias");
                return lista;
            }
        }


    }
}
