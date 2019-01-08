
using Domain.Smartway.Mantenimiento;
using System.Data.Entity.ModelConfiguration;

namespace Data.Smartway.Mappings.Mantenimiento
{
    public class DireccionConfiguration : EntityTypeConfiguration<Direccion>
    {
        public DireccionConfiguration()
            : base()
        {
            ToTable("mantenimiento.direccion");
            HasKey(p => p.iddireccion);
            //Property(x => x.iddireccion).IsRequired;       
        }
    }
}
