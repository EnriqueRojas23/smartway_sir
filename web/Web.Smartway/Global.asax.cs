

namespace Web.Smartway
{
    using System;
    using System.Globalization;
    using System.Threading;
    using System.Web;
    using Web.Common.HttpApplications;
    using Web.Smartway.Security;

   

    public class MvcApplication :  CommonHttpApplication  
    {
        protected virtual void Application_PostAuthenticateRequest(object sender, EventArgs e)
        {
            if (HttpContext.Current.Session == null) return;
            if (!this.Request.IsAuthenticated) return;
            var identity = new CustomIdentity(HttpContext.Current.User.Identity);
            var principal = new CustomPrincipal(identity);
            HttpContext.Current.User = principal;

            CultureInfo newCulture = (CultureInfo)System.Threading.Thread.CurrentThread.CurrentCulture.Clone();
            newCulture.DateTimeFormat.ShortDatePattern = "dd-MMM-yyyy";
            newCulture.DateTimeFormat.DateSeparator = "-";
            Thread.CurrentThread.CurrentCulture = newCulture;
        }
     
    }
}