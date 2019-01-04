namespace Web.Common.HttpApplications.ActionFilters
{
    using System.Web;

    using log4net;
    using System.Reflection;
    using System.Web.Mvc;
    using System.Web.Security;
    using System;

    public class SessionExpiredAttribute : ActionFilterAttribute
    {
        private static ILog log = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var ctx = HttpContext.Current;

            if (ctx.Session != null)
            {

                if (ctx.Session.IsNewSession || ctx.Session["dbUser"] == null)
                {
                    var sessionCookie = ctx.Request.Headers["Cookie"];
                    if ((null != sessionCookie) && (sessionCookie.IndexOf("ASP.NET_SessionId") >= 0) && ctx.Session["CreateSession"] == null)
                    {
                        UrlHelper url = new UrlHelper(HttpContext.Current.Request.RequestContext);
                        log.Debug("urlhelper: " + url.Action("index", "account", new { area="" }));
                        log.Debug("pathandquery: " + filterContext.HttpContext.Request.Url.PathAndQuery);

                        string redirectOnSuccess = filterContext.HttpContext.Request.Url.PathAndQuery;

                        if (redirectOnSuccess.Contains("Account")) redirectOnSuccess = url.Action("index", "account", new { area = "" });  //redirectOnSuccess = "%2f";
                        string redirectUrl = string.Format("?ReturnUrl={0}", redirectOnSuccess);

                        string loginUrl = FormsAuthentication.LoginUrl + redirectUrl;
                        if (ctx.Request.IsAuthenticated)
                        {
                            FormsAuthentication.SignOut();
                        }
                        ctx.Session["CreateSession"] = DateTime.Now;
                        RedirectResult rr = new RedirectResult(loginUrl);
                        filterContext.Result = rr;
                    }
                }
            }

            base.OnActionExecuting(filterContext);
        }
    }
}