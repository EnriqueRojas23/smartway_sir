using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Configuration;
using System.Web.Mvc;
using System.Web.Routing;

namespace Web.Smartway.Helpers
{
    public class SessionExpireFilterAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            HttpContext ctx = HttpContext.Current;

            // check if session is supported
            if (ctx.Session != null)
            {
                if (ctx.Session.IsNewSession)
                {
                    string sessionCookie = ctx.Request.Headers["Cookie"];

                    if ((null != sessionCookie) && (sessionCookie.IndexOf("ASP.NET_SessionId") >= 0))
                    {
                        ctx.Response.Redirect("~/Account/SignIn");
                    }
                }
            }

            base.OnActionExecuting(filterContext);
        }
    }

}