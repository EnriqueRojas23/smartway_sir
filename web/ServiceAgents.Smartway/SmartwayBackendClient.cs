using System.Reflection;
using CommandContracts.Common;
using QueryContracts.Common;
using ServiceAgents.Common;
using ServiceAgents.Smartway.SmartwayReference;
using System;

namespace ServiceAgents.Smartway
{
    public class TysBackendClient : IBackendClient
    {
        static readonly string AssemblyName = Assembly.GetExecutingAssembly().GetName().Name;
        BackendServiceClient client = new BackendServiceClient("SmartwayWSHttpBinding_IBackendService", BindingClient.UrlDisponible(AssemblyName));
        


        public CommandResult ExecuteCommand(Command command)
        {
            return client.ExecuteCommand(command);
        }

        public QueryResult ExecuteQuery(QueryParameter parameter)
        {
            return client.ExecuteQuery(parameter);
        }
               
        public void Dispose()
        {
            client.Close();
        }
    }
}
