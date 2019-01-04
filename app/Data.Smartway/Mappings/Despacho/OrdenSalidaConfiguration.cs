

using Domain.Smartway.Despacho;
using System.Data.Entity.ModelConfiguration;
namespace Data.Smartway.Mappings.Despacho
{
   
    public class OrdenSalidaConfiguration : EntityTypeConfiguration<OrdenSalida>
    {
        public OrdenSalidaConfiguration()
            : base()
        {
            ToTable("despacho.ordensalida");
            HasKey(p => p.iddocumentosalida);
        }
    }
}
