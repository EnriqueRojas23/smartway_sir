using Seguridad.Common;
using System.Collections.Generic;
using System.Text;
using System.Web.Mvc;
using System.Linq;
using System.Web.Routing;
using System;

namespace Web.Common.HtmlHelpers
{
    public static class MenuHtmlHelpers
    {
        public static MvcHtmlString ListarMenu(this HtmlHelper helper, IEnumerable<MenuOpcion> opciones)
        {
            var urlhelper = new UrlHelper(helper.ViewContext.RequestContext);
            StringBuilder html_prin = new StringBuilder();

            if (opciones == null) { return new MvcHtmlString(""); }
            
            foreach (var opcion in opciones.OrderBy(x=>x.NombreMenu))
            {
                var classIsSelected =  helper.IsSelected(opcion.ControllerName, null, null);
                var data_i18n = string.IsNullOrEmpty(opcion.ControllerName) ? string.Empty : "data-i18n=\"nav." + opcion.ControllerName.ToLower() + "\"";

                var tag_li_prin = new TagBuilder("li");

                if (classIsSelected != "")
                {
                    tag_li_prin.AddCssClass(classIsSelected);
                }

                //creando enlace principal
                var tag_lnk_prin = new TagBuilder("a");

                var urlgenerate = MenuHtmlHelpers.GenerateUrl(new UrlHelper(helper.ViewContext.RequestContext), opcion.ControllerName, opcion.ActionName, opcion.AttributesRoute);
                tag_lnk_prin.MergeAttribute("href", urlgenerate);

                //creando texto relleno
                StringBuilder str_lnk_innerht = new StringBuilder();
                str_lnk_innerht.AppendLine("<span class=\"icon\"><i class=\"fa " + opcion.IconoMenu + "\"></i></span>");
                str_lnk_innerht.AppendLine("<span class=\"nav-label\" " + data_i18n + ">" + opcion.NombreMenu + "</span>");
                str_lnk_innerht.AppendLine("<span class=\"fa arrow\"></span>");

                tag_lnk_prin.InnerHtml = str_lnk_innerht.ToString();
                

                //integrando todos los tags
                tag_li_prin.InnerHtml = tag_lnk_prin.ToString();
                if (opcion.MenuItem.Any())
                {
                    tag_li_prin.InnerHtml += MenuHtmlHelpers.ConstruirItems(helper, opcion.MenuItem, opcion.Nivel);
                }
                html_prin.AppendLine(tag_li_prin.ToString());

            }



            return new MvcHtmlString(html_prin.ToString());
        }

        private static string GenerateUrl(UrlHelper urlhelper, string controllername, string actionname, string attribute)
        {
            if(string.IsNullOrEmpty(controllername) || string.IsNullOrEmpty(actionname)) return "#";
            
            RouteValueDictionary route = null;
            if (string.IsNullOrEmpty(attribute) == false)
            {
                route = new RouteValueDictionary();
                var attrArray = attribute.Split(',');
                for (var i = 0; i < attrArray.Length; i++)
                {
                    var attr = attrArray[i].Split(':');
                    route.Add(attr[0], Convert.ToString(attr[1]));
                }
            }
            return urlhelper.Action(actionname, controllername, route);
        }


        private static string ConstruirItems(HtmlHelper helper, IEnumerable<MenuOpcion> opciones, int level)
        {
           
            //contruir el primer ul
            TagBuilder tag_ul_second = new TagBuilder("ul");
          

            //
            StringBuilder item_second = new StringBuilder();
            foreach (var opcion in opciones.OrderBy(x=>x.Secuencia) )
            {
                var classIsSelectedLi = helper.IsSelected(null, opcion.ActionName, null);
                var classIsSelectedUL = helper.IsSelected(opcion.ControllerName, null, "in");
                
                TagBuilder tag_li_second = new TagBuilder("li");
                TagBuilder tag_lnk_second = new TagBuilder("a");
               

                tag_lnk_second.SetInnerText(opcion.NombreMenu);
                if (opcion.TipoMenu == "I"){
                    var urlgenerate = MenuHtmlHelpers.GenerateUrl(new UrlHelper(helper.ViewContext.RequestContext), opcion.ControllerName, opcion.ActionName, opcion.AttributesRoute);
                    tag_lnk_second.MergeAttribute("href", urlgenerate);

                    if (classIsSelectedLi != "")
                    {
                        tag_li_second.AddCssClass(classIsSelectedLi);
                    }
                }

                tag_li_second.InnerHtml = tag_lnk_second.ToString();
                if (opcion.MenuItem.Any()) {
                    tag_li_second.InnerHtml += MenuHtmlHelpers.ConstruirItems(helper, opcion.MenuItem, opcion.Nivel);
                }
                item_second.AppendLine(tag_li_second.ToString());

                if (classIsSelectedUL != "")
                {
                    tag_ul_second.MergeAttribute("class", classIsSelectedUL, true);
                    tag_ul_second.MergeAttribute("class", "sidebar - nav");
                    
                }
            }
            string prueba = MenuHtmlHelpers.ObtenerLevelClass(level).ToString();
            tag_ul_second.AddCssClass(MenuHtmlHelpers.ObtenerLevelClass(level));
            tag_ul_second.InnerHtml += item_second.ToString();
            return tag_ul_second.ToString();

        }

        private static string ObtenerLevelClass(int nivel)
        {
            var level = new Dictionary<int, string>();
            level.Add(1, "nav nav-second-level");
            level.Add(2, "nav nav-third-level");

            if (level.ContainsKey(nivel)) return level[nivel];
            return string.Empty;

        }

    }
}
