

namespace ServiceAgents.Common
{
    using System.Reflection;
    using System.ServiceModel;

    using CommandContracts.Common;

    using log4net;

    using QueryContracts.Common;

    using StructureMap;
    using System.Web.Mvc;

    public static class Extensions
    {
        private static ILog log = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);

        public static object Execute(this QueryParameter parameter)
        {
            var backendClient = ObjectFactory.GetInstance<IBackendClient>();
            parameter.ServidorWeb = System.Environment.MachineName;

            try
            {
                object objServicio = backendClient.ExecuteQuery(parameter);
                return objServicio;
            }
            catch (EndpointNotFoundException ex)
            {
                log.Error(ex.Message, ex);
                throw;
             }
        }

        public static object Execute(this Command command)
        {
            var backendClient = ObjectFactory.GetInstance<IBackendClient>();

            try
            {
                object objServicio = backendClient.ExecuteCommand(command);
                return objServicio;
            }
            catch (EndpointNotFoundException ex)
            {
                        
                log.Error(ex.Message, ex);
                throw;
            }
        }

        public static object Execute(this Command command, ControllerContext context)
        {
            //var backendClient = ObjectFactory.GetInstance<IBackendClient>();
            CommandResult resultadobackendClient = null;
            if (context.Controller.ViewData.ModelState.IsValid)
            {
                var backendClient = ObjectFactory.GetInstance<IBackendClient>();
                try
                {
                    resultadobackendClient = backendClient.ExecuteCommand(command);
                }
                catch (FaultException<CommandFault> e)
                {
                    log.Error(e.Message, e);
                    foreach (var error in e.Detail.CommandErrors)
                    {
                        context.Controller.ViewData.ModelState.AddModelError(error.PropertyName, error.ErrorMessage);
                    }
                }
            }
            ////if (!context.Controller.ViewData.ModelState.IsValid)
            ////{
            ////    errorView.ViewData = context.Controller.ViewData;
            ////    errorView.TempData = context.Controller.TempData;
            ////    errorView.ExecuteResult(context);
            ////    return;
            ////}
            return resultadobackendClient;
          
        }

    }
}
