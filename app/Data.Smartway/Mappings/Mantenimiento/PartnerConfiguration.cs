

using Domain.Smartway.Mantenimiento;
using System.Data.Entity.ModelConfiguration;
namespace Data.Smartway.Mappings.Mantenimiento
{
    public class PartnerConfiguration : EntityTypeConfiguration<Partner>
    {
        public PartnerConfiguration()
            : base()
        {
            ToTable("mantenimiento.partner");
            HasKey(p => p.idpartner);
      


        }
    }
}
