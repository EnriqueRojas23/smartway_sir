using Domain.Smartway.Reparacion;
using System.Data.Entity.ModelConfiguration;
namespace Data.Smartway.Mappings.Despacho
{
   
    public class VentaCotizacionDetalleConfiguration : EntityTypeConfiguration<VentaCotizacionDetalle>
    {
        public VentaCotizacionDetalleConfiguration()
            : base()
        {
            ToTable("agendamiento.ventacotizaciondetalle");
            HasKey(p => p.idcotizaciondetalle);
        }
    }
}
