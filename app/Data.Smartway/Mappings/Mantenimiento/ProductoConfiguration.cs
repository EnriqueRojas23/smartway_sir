

using Domain.Smartway.Mantenimiento;
using System.Data.Entity.ModelConfiguration;
namespace Data.Smartway.Mappings.Mantenimiento
{
    public class ProductoConfiguration : EntityTypeConfiguration<Producto>
    {
        public ProductoConfiguration()
            : base()
        {
            ToTable("mantenimiento.producto");
            HasKey(p => p.idproducto);
            //Property(p => p.idcliente).IsRequired();
        }
    }
}
