namespace Web.Coolbox.Areas.Delivery.Models.Pedidos
{
    using System.Globalization;
    using System.Web;
    using System.Web.Mvc;
    using System.Web.UI.WebControls;

    using Web.Coolbox.DataAccess.Pedidos;

    public class IndexModel
    {
        public HtmlString ListadoEstados()
        {
            var isActive = true;

            var listado = PedidosData.GetListarEstado(null);
            var tag = new TagBuilder("ul");
            tag.Attributes.Add("id", "ulestado");
            tag.AddCssClass("nav nav-pills nav-stacked");

            foreach (var estado in listado)
            {
                var itemTag = new TagBuilder("li");
                var linkTag = new TagBuilder("a");
                linkTag.InnerHtml =  estado.est_str_descrip + " <span class='badge'>"  +  estado.cantidad.ToString()   +   "</span>";
                linkTag.Attributes.Add("href",  string.Format("javascript:cargarPedido('li_{0}', {0})", estado.est_int_id));

                if (isActive) {
                   //
                    itemTag.AddCssClass("active");
                    isActive = false;
                }
                itemTag.Attributes.Add("align", "right");
                itemTag.Attributes.Add("id", "li_" + estado.est_int_id.ToString(CultureInfo.InvariantCulture));

                itemTag.InnerHtml = linkTag.ToString();
                tag.InnerHtml += itemTag.ToString();
            }
            return new MvcHtmlString(tag.ToString());    
        }
    }
}