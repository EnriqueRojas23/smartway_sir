

using Domain.Smartway.Agendamiento;
using System.Data.Entity.ModelConfiguration;
namespace Data.Smartway.Mappings.Agendamiento
{
    public class IncidenciaEvaluacionConfiguration : EntityTypeConfiguration<IncidenciaEvaluacion>
    {
        public IncidenciaEvaluacionConfiguration()
            : base()
        {
            ToTable("agendamiento.incidenciaevaluacion");
            HasKey(p => p.idevaluaciongarantia);
        }
    }
}
