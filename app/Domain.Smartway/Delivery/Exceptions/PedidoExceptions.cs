

namespace Domain.Smartway.Delivery.Exceptions
{
    using Domain.Common.Exceptions;

    public class PedidoExceptions : DomainException
    {
        public PedidoExceptions(string message)
            : base(message)
        {
        }
    }
}
