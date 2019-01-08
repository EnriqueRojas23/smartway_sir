using System;
using System.Configuration;
using System.Net.Mail;

/// <summary>
/// Summary description for MailHelper
/// </summary>
namespace Web.Smartway.Helpers
{
    public class MailHelper
    {
        private static String SMTP_SERVER = ConfigurationManager.AppSettings["SMTPSERVER"].ToString();

        public static bool EnviarMail(String destinatario, string subject, string body, bool html = true)
        {

            MailMessage mail = new MailMessage();
            if (ConfigurationManager.AppSettings["CORREO-PRUEBA-ACTIVO"].ToString() == "1")
            {
                string[] dest = ConfigurationManager.AppSettings["CORREO-PRUEBA"].ToString().Split(';');
                foreach (var item in dest)
                {
                    if (item != "") mail.To.Add(item);
                }
            }
            else
            {
                string[] dest = destinatario.Split(';');
                foreach (var item in dest)
                {
                    if (item != "") mail.To.Add(item);
                }
            }

            mail.From = new MailAddress(ConfigurationManager.AppSettings["MAIL_FROM"]);
            mail.Subject = "Smartway: " + subject;
            mail.Body = body;
            if (html) mail.IsBodyHtml = true;
            mail.Priority = MailPriority.High;
            SmtpClient mSmtpClient = new SmtpClient();
            mSmtpClient.Host = SMTP_SERVER;

            try
            {
                mSmtpClient.Send(mail);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
            finally
            {

                if (mail != null)
                {
                    mail.Dispose();
                }
            }
        }

    }

}