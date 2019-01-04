
using Domain.TYS.Seguimiento;
using System.Data.Entity.ModelConfiguration;
namespace Data.TYS.Mappings.Seguimiento
{
    public class ReparacionConfiguration : EntityTypeConfiguration<Reparacion>
    {
        public ReparacionConfiguration()
            : base()
        {
            ToTable("mantenimiento.reparacionsmartway");
            HasKey(p => p.idreparacionsmartway);
            //Property(p => p.idtarifa).IsRequired();
        }
    }
}
