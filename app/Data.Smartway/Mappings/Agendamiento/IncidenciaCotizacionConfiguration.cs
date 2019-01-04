

using Domain.Smartway.Agendamiento;
using System.Data.Entity.ModelConfiguration;
namespace Data.Smartway.Mappings.Agendamiento
{
    public class IncidenciaCotizacionConfiguration : EntityTypeConfiguration<IncidenciaCotizacion>
    {
        public IncidenciaCotizacionConfiguration()
            : base()
        {
            ToTable("agendamiento.incidenciacotizacion");
            HasKey(p => p.idcotizacion);
        }
    }
}
