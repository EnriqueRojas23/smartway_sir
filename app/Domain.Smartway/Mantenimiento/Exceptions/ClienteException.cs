namespace Domain.Smartway.Mantenimiento.Exceptions
{
    using Domain.Common.Exceptions;

    public class ClienteException : DomainException
    {
        public ClienteException(string message)
            : base(message)
        {
        }
    }
}