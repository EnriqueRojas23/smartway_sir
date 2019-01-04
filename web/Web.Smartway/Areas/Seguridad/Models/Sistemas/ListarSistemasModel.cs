
using System.ComponentModel.DataAnnotations;
using Web.Common.Extensions;

namespace Web.Smartway.Areas.Seguridad.Models.Sistemas
{
    public class ListarSistemasModel : ParameterGridDefault
    {
        public ListarSistemasModel() { }
        public string SearchDefault { get; set; }

        [Display(Name = "Alias:")]
        public string Alias { get; set; }

        [Display(Name = "Nombre:")]
        public string NombreCompleto { get; set; }

        [Display(Name = "Id:")]
        public int sis_int_id { get; set; }

    }
}