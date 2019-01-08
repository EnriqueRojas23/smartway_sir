

using Domain.Smartway.Mantenimiento;
using System.Data.Entity.ModelConfiguration;
namespace Data.Smartway.Mappings.Mantenimiento
{
    public class SucursalConfiguration : EntityTypeConfiguration<Sucursal>
    {
        public SucursalConfiguration()
            : base()
        {
            ToTable("mantenimiento.sucursal");
            HasKey(p => p.idsucursal);
      


        }
    }
}
