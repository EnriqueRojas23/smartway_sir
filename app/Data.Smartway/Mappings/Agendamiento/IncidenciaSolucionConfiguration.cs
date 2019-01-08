

using Domain.Smartway.Agendamiento;
using System.Data.Entity.ModelConfiguration;
namespace Data.Smartway.Mappings.Agendamiento
{
    public class IncidenciaSolucionConfiguration : EntityTypeConfiguration<IncidenciaSolucion>
    {
        public IncidenciaSolucionConfiguration()
            : base()
        {
            ToTable("agendamiento.incidenciasolucion");
            HasKey(p => p.idincidenciasolucion);
        }
    }
}
