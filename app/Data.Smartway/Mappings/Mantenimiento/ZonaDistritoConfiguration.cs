
using Domain.Smartway.Mantenimiento;
using System.Data.Entity.ModelConfiguration;
namespace Data.Smartway.Mappings.Mantenimiento
{
    public class ZonaDistritoConfiguration : EntityTypeConfiguration<ZonaDistrito>
    {
        public ZonaDistritoConfiguration()
            : base()
        {
            ToTable("mantenimiento.zonadistrito");
            HasKey(p => p.idzonadistrito);
            //Property(p => p.idzonadistrito).IsRequired();
        }
    }
}
