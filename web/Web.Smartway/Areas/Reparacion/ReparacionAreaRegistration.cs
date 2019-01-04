using System.Web.Mvc;

namespace Web.Smartway.Areas.Reparacion
{
    public class ReparacionAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Reparacion";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "Reparacion_default",
                "Reparacion/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}