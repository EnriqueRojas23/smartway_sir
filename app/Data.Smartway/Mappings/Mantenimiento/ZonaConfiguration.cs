
using Domain.Smartway.Mantenimiento;
using System.Data.Entity.ModelConfiguration;
namespace Data.Smartway.Mappings.Mantenimiento
{
    public class ZonaConfiguration : EntityTypeConfiguration<Zona>
    {
        public ZonaConfiguration()
            : base()
        {
            ToTable("mantenimiento.zona");
            HasKey(p => p.idzona);
           // Property(p => p.idzona).IsRequired();
        }
    }
}
