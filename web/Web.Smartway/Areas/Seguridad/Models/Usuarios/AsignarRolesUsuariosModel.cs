

using QueryContracts.Smartway.Seguridad.Result;
using System;
using System.ComponentModel.DataAnnotations;
namespace Web.Smartway.Areas.Seguridad.Models.Usuarios
{
    public class AsignarRolesUsuariosModel 
    {
        public string idsRolesDestino { get; set; }

        [Display(Name = "Nombre Completo")]
        public string NombreCompleto { get { return String.Format("{0} {1}", usr_str_nombre, usr_str_apellidos); } }

        public int usr_int_id { get; set; }
        public string usr_str_nombre { get; set; }
        public string usr_str_apellidos { get; set; }
        
        [Display(Name="Usuario")]
        public string usr_str_red { get; set; }

        [Display(Name = "Correo Electronico")]
        public string usr_str_email { get; set; }


    }
}