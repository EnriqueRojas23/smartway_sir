using Domain.Smartway.Inventario;
using System.Data.Entity.ModelConfiguration;
namespace Data.Smartway.Mappings.Inventario
{
   
    public class InventarioConfiguration : EntityTypeConfiguration<InventarioGeneral>
    {
        public InventarioConfiguration()
            : base()
        {
            ToTable("inventario.inventariogeneral");
            HasKey(p => p.idinventario);
        }
    }
}
