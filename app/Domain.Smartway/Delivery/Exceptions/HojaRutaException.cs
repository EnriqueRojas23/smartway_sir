

namespace Domain.Smartway.Delivery.Exceptions
{
    using Domain.Common.Exceptions;

    public class HojaRutaException : DomainException
    {
        public HojaRutaException(string message)
            : base(message)
        {
        }
    }
}
