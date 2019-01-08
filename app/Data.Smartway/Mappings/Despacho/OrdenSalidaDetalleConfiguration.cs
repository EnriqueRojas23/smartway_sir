

using Domain.Smartway.Despacho;
using System.Data.Entity.ModelConfiguration;
namespace Data.Smartway.Mappings.Despacho
{
   
    public class OrdenSalidaDetalleConfiguration : EntityTypeConfiguration<OrdenSalidaDetalle>
    {
        public OrdenSalidaDetalleConfiguration()
            : base()
        {
            ToTable("despacho.ordensalidadetalle");
            HasKey(p => p.idordensalidadetalle);
        }
    }
}
