
using log4net;
using log4net.Appender;
using log4net.Repository.Hierarchy;
using System;
using System.IO;
using System.Linq;
using System.Xml;

namespace Infraestructure.Common.Logging.AppenderBuilders
{
    public class AdoNetAppenderBuilder : IAppenderBuilder
    {
        public IAppender Build()
        {
            using (Stream stream = System.Reflection.Assembly.GetExecutingAssembly().GetManifestResourceStream("Infraestructure.Common.log4net.config"))
            {
                log4net.Config.XmlConfigurator.Configure(stream);
            }
            Hierarchy hier = LogManager.GetRepository() as Hierarchy;
            if (hier != null)
            { 
                var adoAppender = (AdoNetAppender)hier.GetAppenders().Where(x=> x.Name.Equals("AdoNetAppender", StringComparison.InvariantCultureIgnoreCase)).FirstOrDefault(); 
                if(adoAppender != null)
                {
                   // adoAppender.ConnectionString = Configuration.
                }

            }


            return null;
        }



    }
}
