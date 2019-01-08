namespace Domain.Smartway.Logistica.Exceptions
{
    using Domain.Common.Exceptions;

    public class LogisticaException : DomainException
    {
        public LogisticaException(string message): base(message)
        {
        }
    }
}