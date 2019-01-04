﻿using System.Web.Mvc;

namespace Web.Smartway.Areas.Agendamiento
{
    public class DespachoAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Despacho";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "Despacho_default",
                "Despacho/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}