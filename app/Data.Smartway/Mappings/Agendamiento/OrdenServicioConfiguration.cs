

using Domain.Smartway.Agendamiento;
using System.Data.Entity.ModelConfiguration;
namespace Data.Smartway.Mappings.Agendamiento
{
    public class OrdenServicioConfiguration : EntityTypeConfiguration<OrdenServicio>
    {
        public OrdenServicioConfiguration()
            : base()
        {
            ToTable("agendamiento.ordenserviciotecnico");
            HasKey(p => p.idordenserviciotecnico);
        }
    }
}
