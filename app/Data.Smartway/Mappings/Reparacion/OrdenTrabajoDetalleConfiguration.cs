using Domain.Smartway.Reparacion;
using System.Data.Entity.ModelConfiguration;
namespace Data.Smartway.Mappings.Despacho
{
   
    public class OrdenTrabajoDetalleConfiguration : EntityTypeConfiguration<OrdenTrabajoDetalle>
    {
        public OrdenTrabajoDetalleConfiguration()
            : base()
        {
            ToTable("reparacion.ordentrabajodetalle");
            HasKey(p => p.idordentrabajodetalle);
        }
    }
}
