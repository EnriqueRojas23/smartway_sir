using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.Common.Extensions;
using Web.Smartway.DataAccess.Seguridad;

namespace Web.Smartway.Areas.Seguridad.Models.Usuarios
{
    public class ListarUsuariosModel : ParameterGridDefault
    {
        public ListarUsuariosModel() { }

        public ListarUsuariosModel(bool callSeleList) {
            if (callSeleList) FillSelectList();
        }

        private SelectList _listaRoles;
       
        public string SearchDefault { get; set; }
        
        [Display(Name = "Alias Usuario")]
        public string AliasUsuario { get; set; }

        [Display(Name = "Nombre Completo")]
        public string NombreCompleto { get; set; }

        public int idtipo { get; set; }
        [Display(Name = "Rol")]
        public int? IdRol { get; set; }
        public int idcliente { get; set; }

        public void FillSelectList()
        {
            var roles = RolesData.ListarRoles();
            _listaRoles = new SelectList(roles, "rol_int_id", "rol_str_alias");
        }
        public SelectList ListaRoles { get { return _listaRoles; } }

    }



    public class TipoUsuario
    {
        public int idtipo { get; set; }
        public string tipo { get; set; }
    }
}