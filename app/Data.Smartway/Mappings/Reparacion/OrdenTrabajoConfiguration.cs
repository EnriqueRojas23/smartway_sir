using Domain.Smartway.Reparacion;
using System.Data.Entity.ModelConfiguration;
namespace Data.Smartway.Mappings.Despacho
{
   
    public class OrdenTrabajoConfiguration : EntityTypeConfiguration<OrdenTrabajo>
    {
        public OrdenTrabajoConfiguration()
            : base()
        {
            ToTable("reparacion.ordentrabajo");
            HasKey(p => p.idordentrabajo);
        }
    }
}
