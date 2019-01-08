namespace Domain.Smartway.Agendamiento.Exceptions
{
    using Domain.Common.Exceptions;

    public class IncidenciaException : DomainException
    {
        public IncidenciaException(string message)
            : base(message)
        {
        }
    }
}