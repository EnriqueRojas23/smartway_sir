using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Web.Smartway.Areas.Agendamiento.Models
{
    public class Root
    {
        public HtmlString BuildRoot()
        {

            var tag = new TagBuilder("ul");
            tag.Attributes.Add("id", "ulestado");
            tag.AddCssClass("nav nav-pills nav-stacked");


            var itemTag = new TagBuilder("li");
            var linkTag = new TagBuilder("a");
            linkTag.InnerHtml = "Prueba1" + " <span class='badge'>" + "Activo" + "</span>";
            linkTag.Attributes.Add("href", string.Format("javascript:cargarPedido('li_{0}', {0})", 1));

            itemTag.Attributes.Add("align", "right");
            itemTag.Attributes.Add("id", "li_" + "1".ToString(CultureInfo.InvariantCulture));

            itemTag.InnerHtml = linkTag.ToString();
            tag.InnerHtml += itemTag.ToString();
            return new MvcHtmlString(tag.ToString());
        }
    }
}