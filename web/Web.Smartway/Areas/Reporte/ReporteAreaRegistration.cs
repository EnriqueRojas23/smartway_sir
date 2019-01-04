using System.Web.Mvc;

namespace Web.Smartway.Areas.Reparacion
{
    public class ReporteAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Reporte";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "Reporte_default",
                "Reporte/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}