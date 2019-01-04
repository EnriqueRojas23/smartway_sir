using System;
using System.Collections.Generic;
using System.Text;
using System.Web;
using System.Web.Mvc;
using Web.Smartway.DataAccess.Seguridad;
using System.Linq;
using Seguridad.Common;

namespace Web.Smartway.Areas.Seguridad.Models.Roles
{
    public class AsignarMenuOpcionModel
    {
        public string sis_str_sigla { get; set; }
        public int? rol_int_id { get; set; }

        public string rol_str_descrip { get; set; } 

        public IList<MenuOpcion> ListaOpciones { get; set; }

        public HtmlString GetTreeMenuOpcion(IEnumerable<MenuOpcion> popciones)
        {
            //return null;

            //var res = MenuOpcionData.GetListaTotalMenu(2);
            var root_tag = new TagBuilder("ul");
            root_tag.InnerHtml = ConstruirItems(popciones);
            return new MvcHtmlString(HttpUtility.HtmlDecode(root_tag.ToString())); 
        }

        private string ConstruirItems(IEnumerable<MenuOpcion> opciones)
        {
            StringBuilder items = new StringBuilder();
            TagBuilder tagli = new TagBuilder("li");
           
            foreach (var opc in opciones)
            {
                string str_value = String.Format("data-idmenu:{0}|data-selectoption:{1}|data-permiso:{2}", Convert.ToString(opc.IdMenuOpcion),  Convert.ToString(opc.ItemSeleccionado), Convert.ToString(opc.CodigoPermiso));
                TagBuilder taghidden = new TagBuilder("input");
                taghidden.MergeAttribute("type", "hidden", true);
                taghidden.MergeAttribute("id", "trevalor", true);
                taghidden.MergeAttribute("name", "trevalor", true);

                taghidden.MergeAttribute("value", str_value, true);
                
                tagli.MergeAttribute("data-idmenu", Convert.ToString(opc.IdMenuOpcion), true);
                tagli.MergeAttribute("data-selectoption",  Convert.ToString(opc.ItemSeleccionado), true);
                tagli.MergeAttribute("data-selected", Convert.ToString(opc.ItemSeleccionado), true);
                tagli.MergeAttribute("data-permiso", Convert.ToString(opc.CodigoPermiso), true);

                tagli.MergeAttribute("data-codmenu", Convert.ToString(opc.CodigoMenu), true);
                tagli.MergeAttribute("data-desmenu", Convert.ToString(opc.NombreMenu), true);
                tagli.MergeAttribute("data-tipomenu", Convert.ToString(opc.TipoMenu), true);
                tagli.MergeAttribute("data-url", Convert.ToString(opc.Url), true);
                
                tagli.InnerHtml = taghidden.ToString();
                                
                if (opc.TipoMenu == "M")
                {
                    tagli.MergeAttribute("class", "jstree-open", true);   
                }
                else if (opc.TipoMenu == "I") 
                {
                    string html = string.Empty;
                    html += string.Format("<span class=\"content\">{0}</span>", opc.NombreMenu);
                    tagli.MergeAttribute("data-jstree", "{'type':'html'}", true);
                    tagli.InnerHtml += html;
                    
                }
               
                var texto =  taghidden.ToString() + "  " + opc.NombreMenu;
                if (opc.MenuItem.Any())
                {
                    var tagul = new TagBuilder("ul");
                    tagul.InnerHtml = ConstruirItems(opc.MenuItem);
                    tagli.InnerHtml = texto + tagul.ToString();
                }
                else { tagli.InnerHtml = texto; }
              //  items.AppendLine(taghidden.ToString());
                items.AppendLine(tagli.ToString());
            }
            return items.ToString();
        }

    }
}