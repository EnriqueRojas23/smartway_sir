
using Domain.Common.Exceptions;
namespace Domain.Smartway.Seguridad.Exceptions
{
    public class UsuarioException : DomainException
    {
        public UsuarioException(string message)
            : base(message)
        {
        }
    }
}
