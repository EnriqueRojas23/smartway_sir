

using Domain.Smartway.Agendamiento;
using System.Data.Entity.ModelConfiguration;
namespace Data.Smartway.Mappings.Agendamiento
{
    public class AccesorioIncidenciaConfiguration : EntityTypeConfiguration<AccesorioIncidencia>
    {
        public AccesorioIncidenciaConfiguration()
            : base()
        {
            ToTable("agendamiento.incidenciaaccesorio");
            HasKey(p => p.idincidenciaaccesorio);
        }
    }
}
