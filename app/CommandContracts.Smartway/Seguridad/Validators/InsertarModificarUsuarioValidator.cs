
using FluentValidation;
namespace CommandContracts.Smartway.Seguridad.Validators
{
    public class InsertarModificarUsuarioValidator : AbstractValidator<InsertarModificarUsuarioCommand>
    {
        public InsertarModificarUsuarioValidator()
        {
            RuleFor(x => x.usr_str_red).NotNull().WithMessage("Se requiere el usuario de Red");
            RuleFor(x => x.usr_str_nombre).NotNull().WithMessage("Se requiere el nombre del usuario");
            RuleFor(x => x.usr_str_apellidos).NotNull().WithMessage("Se requiere el apellido del usuario");
        }
    }
}
