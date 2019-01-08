

using Domain.Common.Exceptions;
namespace Domain.Smartway.Seguridad.Exceptions
{
    public class SistemaRolUsuarioException : DomainException
    {
        public SistemaRolUsuarioException(string message)
            : base(message)
        {
        }
    }
}
