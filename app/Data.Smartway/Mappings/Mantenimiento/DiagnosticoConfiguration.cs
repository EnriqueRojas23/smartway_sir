
using Domain.TYS.Seguimiento;
using System.Data.Entity.ModelConfiguration;
namespace Data.TYS.Mappings.Seguimiento
{
    public class DiagnosticoConfiguration : EntityTypeConfiguration<Diagnostico>
    {
        public DiagnosticoConfiguration()
            : base()
        {
            ToTable("mantenimiento.diagnosticosmartway");
            HasKey(p => p.iddiagnosticosmartway);
            //Property(p => p.idtarifa).IsRequired();
        }
    }
}
