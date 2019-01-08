
using Domain.TYS.Seguimiento;
using System.Data.Entity.ModelConfiguration;
namespace Data.TYS.Mappings.Seguimiento
{
    public class FallaConfiguration : EntityTypeConfiguration<Falla>
    {
        public FallaConfiguration()
            : base()
        {
            ToTable("mantenimiento.Falla");
            HasKey(p => p.idfalla);
            //Property(p => p.idtarifa).IsRequired();
        }
    }
}
