

using Domain.Common.Exceptions;
namespace Domain.Smartway.Seguridad.Exceptions
{
    public class SistemaException : DomainException
    {
        public SistemaException(string message)
            : base(message)
        {
        }
    }
}
