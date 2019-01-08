
using Domain.Smartway.Seguridad;
using System.Data.Entity.ModelConfiguration;
namespace Data.Smartway.Mappings.Seguridad
{
    public class SistemaRolUsuarioConfiguration : EntityTypeConfiguration<SistemaRolUsuario>
    {
        public SistemaRolUsuarioConfiguration()
            : base()
        {
            ToTable("seguridad.tbl_seg_sistema_rol_usuario");

            HasKey(p => new { p.sis_int_id, p.rol_int_id, p.usr_int_id });
            //Property(p => p.sis_int_id).IsRequired();
            //Property(p => p.rol_int_id).IsRequired();
            //Property(p => p.usr_int_id).IsRequired();
            
            //HasKey(p => p.ID);
            //Property(p => p.ID).HasColumnName("al_int_id").IsRequired();
        }
    }
}
