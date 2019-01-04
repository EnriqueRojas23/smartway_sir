

using Domain.Smartway.Agendamiento;
using System.Data.Entity.ModelConfiguration;
namespace Data.Smartway.Mappings.Agendamiento
{
    public class IncidenciaConfiguration : EntityTypeConfiguration<Incidencia>
    {
        public IncidenciaConfiguration()
            : base()
        {
            ToTable("agendamiento.incidencia");
            HasKey(p => p.idincidencia);
        }
    }
}
