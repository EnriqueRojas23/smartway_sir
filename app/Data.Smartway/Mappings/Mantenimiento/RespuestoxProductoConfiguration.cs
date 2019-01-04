
using Domain.Smartway.Mantenimiento;
using System.Data.Entity.ModelConfiguration;
namespace Data.TYS.Mappings.Seguimiento
{
    public class RespuestoxProductoConfiguration : EntityTypeConfiguration<RepuestoxProducto>
    {
        public RespuestoxProductoConfiguration()
            : base()
        {
            ToTable("mantenimiento.repuestoxproducto");
            HasKey(p => p.idrepuestoxproducto);
        }
    }
}
