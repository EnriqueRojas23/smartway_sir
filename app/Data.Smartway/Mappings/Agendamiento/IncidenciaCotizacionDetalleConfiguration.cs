

using Domain.Smartway.Agendamiento;
using System.Data.Entity.ModelConfiguration;
namespace Data.Smartway.Mappings.Agendamiento
{
    public class IncidenciaCotizacionDetalleConfiguration : EntityTypeConfiguration<IncidenciaCotizacionDetalle>
    {
        public IncidenciaCotizacionDetalleConfiguration()
            : base()
        {
            ToTable("agendamiento.incidenciacotizaciondetalle");
            HasKey(p => p.idcotizaciondetalle);
        }
    }
}
