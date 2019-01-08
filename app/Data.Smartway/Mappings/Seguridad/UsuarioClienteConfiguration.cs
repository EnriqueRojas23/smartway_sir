using Domain.Smartway.Seguridad;
using System.Data.Entity.ModelConfiguration;
namespace Data.Smartway.Mappings.Seguridad
{
    public class UsuarioClienteConfiguration : EntityTypeConfiguration<UsuarioCliente>
    {
        public UsuarioClienteConfiguration(): base()
        {
            ToTable("dbo.tbl_usuario_cliente");
            HasKey(p => new { p.ucl_int_id });
            //Property(p => p.ucl_int_id).IsRequired();
        }
    }
}
