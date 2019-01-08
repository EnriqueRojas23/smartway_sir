using System.Web.Mvc;

namespace Web.Smartway.Areas.Agendamiento
{
    public class AgendamientoAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Agendamiento";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "Agendamiento_default",
                "Agendamiento/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}