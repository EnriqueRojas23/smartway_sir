using Domain.Smartway.Reparacion;
using System.Data.Entity.ModelConfiguration;
namespace Data.Smartway.Mappings.Despacho
{
   
    public class VentaCotizacionConfiguration : EntityTypeConfiguration<VentaCotizacion>
    {
        public VentaCotizacionConfiguration()
            : base()
        {
            ToTable("agendamiento.ventacotizacion");
            HasKey(p => p.idcotizacion);
        }
    }
}
