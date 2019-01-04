using Domain.Smartway.Seguridad;
using System.Data.Entity.ModelConfiguration;
namespace Data.Smartway.Mappings.Seguridad
{
    public class UsuarioConfiguration : EntityTypeConfiguration<Usuario>
    {
        public UsuarioConfiguration()
            : base()
        {
            ToTable("seguridad.tbl_usuario");

            HasKey(p => new { p.usr_int_id });
            //Property(p => p.usr_int_id).IsRequired();

        }
    }
}
