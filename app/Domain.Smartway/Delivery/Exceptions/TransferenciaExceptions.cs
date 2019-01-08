
using Domain.Common.Exceptions;
namespace Domain.Smartway.Delivery.Exceptions
{
    public class TransferenciaExceptions : DomainException
    {
        public TransferenciaExceptions(string message)
            : base(message)
        {
        }
    }
}
