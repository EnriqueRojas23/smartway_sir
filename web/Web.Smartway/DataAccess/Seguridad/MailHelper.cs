using System;
using System.Data;
using System.Configuration;
using System.Web;

//using System.Web.Mail;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;


/// <summary>
/// Summary description for MailHelper
/// </summary>
public static class MailHelper
{
    private static String SMTP_SERVER = ConfigurationManager.AppSettings["SMTPSERVER"].ToString();

    public static bool EnviarMail(String destinatario, string subject, string body, bool html = true)
    {
        //    MailMessage mail = new MailMessage();
        //    if (ConfigurationManager.AppSettings["CORREO-PRUEBA-ACTIVO"].ToString() == "1")
        //    {
        //        string[] dest = ConfigurationManager.AppSettings["CORREO-PRUEBA"].ToString().Split(';');
        //        foreach (var item in dest)
        //        {
        //            if (item != "") mail.To.Add(item);
        //        }
        //    }
        //    else
        //    {
        //        string[] dest = destinatario.Split(';');
        //        foreach (var item in dest)
        //        {
        //            if (item != "") mail.To.Add(item);
        //        }
        //    }
        //    mail.From = new MailAddress("enrique.rojas@riabc.net");
        //    mail.Subject = "Smartway: " + subject;

        //    mail.Body = body;
        //    if (html) mail.IsBodyHtml = true;
        //    mail.Priority = MailPriority.High;

        //    SmtpClient mSmtpClient = new SmtpClient();
        //    mSmtpClient.Host = "smtp.gmail.com";
        //    mSmtpClient.EnableSsl = true;
        //    mSmtpClient.Port = 25; //465; //587
        //    mSmtpClient.Credentials = new System.Net.NetworkCredential("enrique.rojas@riabc.net", "233205217762");

        //    try { mSmtpClient.Send(mail); return true; }
        //    catch (Exception ex) { return false; }


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
        mail.From = new MailAddress("sir_serviciotecnico@smartway.com.pe");
        mail.Subject = "Smartway: " + subject;

        mail.Body = body;
        if (html) mail.IsBodyHtml = true;
        mail.Priority = MailPriority.High;

        SmtpClient mSmtpClient = new SmtpClient();
        mSmtpClient.Host = SMTP_SERVER;
        mSmtpClient.Timeout = 100;
        mSmtpClient.UseDefaultCredentials = true;
        mSmtpClient.Port = 2525;
        mSmtpClient.Credentials = new System.Net.NetworkCredential("sir_serviciotecnico@smartway.com.pe", "Root2018");

        try { mSmtpClient.Send(mail); return true; }
        catch (Exception ex) { return false; }
    }

}

