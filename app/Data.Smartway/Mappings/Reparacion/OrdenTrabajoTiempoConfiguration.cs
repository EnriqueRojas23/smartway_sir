using Domain.Smartway.Reparacion;
using System.Data.Entity.ModelConfiguration;
namespace Data.Smartway.Mappings.Despacho
{
   
    public class OrdenTrabajoTiempoConfiguration : EntityTypeConfiguration<OrdenTrabajoTiempo>
    {
        public OrdenTrabajoTiempoConfiguration()
            : base()
        {
            ToTable("reparacion.ordentrabajotiempo");
            HasKey(p => p.idordentrabajotiempo);
        }
    }
}
