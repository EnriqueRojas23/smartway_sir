using System.Web.Mvc;

namespace Web.Smartway.Areas.Guias
{
    public class GuiasAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Guias";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "Guias_default",
                "Guias/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}