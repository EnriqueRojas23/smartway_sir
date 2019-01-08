

namespace DistributedServices.Smartway
{
    using DistributedServices.Common;

    class Program
    {
        static void Main(string[] args)
        {
            BackendServiceHost<SmartwayBackendService>.Run(args);
        }
    }
}
