using Domain.Smartway.Inventario;
using System.Data.Entity.ModelConfiguration;
namespace Data.Smartway.Mappings.Inventario
{
   
    public class AlmacenConfiguration : EntityTypeConfiguration<Almacen>
    {
        public AlmacenConfiguration()
            : base()
        {
            ToTable("mantenimiento.almacen");
            HasKey(p => p.idalmacen);
        }
    }
}
