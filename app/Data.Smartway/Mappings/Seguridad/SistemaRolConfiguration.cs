
using Domain.Smartway.Seguridad;
using System.Data.Entity.ModelConfiguration;
namespace Data.Smartway.Mappings.Seguridad
{
    public class SistemaRolConfiguration : EntityTypeConfiguration<SistemaRol>
    {
        public SistemaRolConfiguration()
            : base()
        {
            ToTable("seguridad.tbl_seg_sistema_rol");

            HasKey(p => new { p.sis_int_id, p.rol_int_id });
           // Property(p => p.sis_int_id);
            //Property(p => p.rol_int_id).IsRequired();
            
        }

       
    }
}
