

using Domain.Smartway.Mantenimiento;
using System.Data.Entity.ModelConfiguration;
namespace Data.Smartway.Mappings.Mantenimiento
{
    public class GarantiaConfiguration : EntityTypeConfiguration<Garantia>
    {
        public GarantiaConfiguration()
            : base()
        {
            ToTable("mantenimiento.garantia");
            HasKey(p => p.idgarantia);

        }
    }
}
