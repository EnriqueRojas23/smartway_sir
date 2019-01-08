
using Domain.Smartway.Mantenimiento;
using System.Data.Entity.ModelConfiguration;
namespace Data.Smartway.Mappings.Mantenimiento
{
    public class ValorTablaConfiguration : EntityTypeConfiguration<Valortabla>
    {
        public ValorTablaConfiguration()
            : base()
        {
            ToTable("mantenimiento.valortabla");
            HasKey(p => p.idvalortabla);
           // Property(p => p.idvalortabla).IsRequired();
        }
    }
}
