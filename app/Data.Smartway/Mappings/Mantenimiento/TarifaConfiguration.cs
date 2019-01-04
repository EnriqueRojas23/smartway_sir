
using Domain.TYS.Seguimiento;
using System.Data.Entity.ModelConfiguration;
namespace Data.TYS.Mappings.Seguimiento
{
    public class TarifaConfiguration : EntityTypeConfiguration<Tarifa>
    {
        public TarifaConfiguration()
            : base()
        {
            ToTable("mantenimiento.Tarifa");
            HasKey(p => p.idtarifa);
            //Property(p => p.idtarifa).IsRequired();
        }
    }
}
